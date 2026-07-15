import { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import Swal from 'sweetalert2';
import { stickersData, getSections, getCountries, getGroups, type Sticker } from '../data/stickers';

export default function StickerAlbum() {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [collectedStickers, setCollectedStickers] = useState<Set<number>>(new Set());
  const [filteredStickers, setFilteredStickers] = useState<Sticker[]>(stickersData);

  // Filtros
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [searchNumber, setSearchNumber] = useState('');
  const [showMissingOnly, setShowMissingOnly] = useState(false);

  // Cargar progreso del usuario desde Firebase
  useEffect(() => {
    const savedUser = localStorage.getItem('stickerAlbumUser');
    if (savedUser) {
      setUserName(savedUser);
      setIsLoggedIn(true);
      loadUserProgress(savedUser);
    }
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = stickersData;

    if (selectedSection) {
      filtered = filtered.filter(s => s.section === selectedSection);
    }

    if (selectedCountry) {
      filtered = filtered.filter(s => s.country === selectedCountry);
    }

    if (selectedGroup) {
      filtered = filtered.filter(s => s.group === selectedGroup);
    }

    if (searchNumber) {
      filtered = filtered.filter(s => s.number.includes(searchNumber));
    }

    setFilteredStickers(filtered);
  }, [selectedSection, selectedCountry, selectedGroup, searchNumber]);

  const loadUserProgress = async (user: string) => {
    // Intentar cargar desde localStorage primero
    const localData = localStorage.getItem(`stickerAlbumData_${user}`);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        setCollectedStickers(new Set(parsed.collected || []));
      } catch (error) {
        console.error('Error parseando datos locales:', error);
      }
    }

    // Si Firebase está configurado, intentar sincronizar
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, 'stickerAlbums', user);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCollectedStickers(new Set(data.collected || []));
          // Actualizar localStorage con datos de Firebase
          localStorage.setItem(`stickerAlbumData_${user}`, JSON.stringify({
            collected: data.collected || []
          }));
        }
      } catch (error) {
        console.warn('Firebase no disponible, usando datos locales:', error);
      }
    }
  };

  const saveProgress = async (collected: Set<number>) => {
    if (!userName) return;

    const collectedArray = Array.from(collected);

    // Guardar en localStorage siempre
    localStorage.setItem(`stickerAlbumData_${userName}`, JSON.stringify({
      collected: collectedArray
    }));

    // Guardar en Firebase solo si está configurado
    if (isFirebaseConfigured && db) {
      try {
        await setDoc(doc(db, 'stickerAlbums', userName), {
          userName,
          collected: collectedArray,
          lastUpdated: new Date().toISOString()
        });
      } catch (error) {
        console.warn('No se pudo sincronizar con Firebase:', error);
      }
    }
  };

  const handleLogin = async () => {
    const { value: name } = await Swal.fire({
      title: 'Ingresa tu nombre',
      input: 'text',
      inputPlaceholder: 'Nombre de usuario',
      showCancelButton: true,
      confirmButtonColor: '#9333ea',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un nombre';
        }
        return null;
      }
    });

    if (name) {
      setUserName(name);
      setIsLoggedIn(true);
      localStorage.setItem('stickerAlbumUser', name);
      await loadUserProgress(name);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu progreso está guardado y podrás volver cuando quieras',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#9333ea',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoggedIn(false);
        setUserName('');
        setCollectedStickers(new Set());
        localStorage.removeItem('stickerAlbumUser');
      }
    });
  };

  const toggleSticker = async (stickerId: number) => {
    const isCollected = collectedStickers.has(stickerId);
    const sticker = stickersData.find(s => s.id === stickerId);

    if (isCollected) {
      // Confirmar antes de deseleccionar
      const result = await Swal.fire({
        title: '¿Deseleccionar estampilla?',
        html: `
          <p>Estampilla <strong>#${sticker?.number}</strong></p>
          <p>${sticker?.description}</p>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9333ea',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, deseleccionar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        const newSet = new Set(collectedStickers);
        newSet.delete(stickerId);
        setCollectedStickers(newSet);
        await saveProgress(newSet);
      }
    } else {
      // Agregar sin confirmación
      const newSet = new Set(collectedStickers);
      newSet.add(stickerId);
      setCollectedStickers(newSet);
      await saveProgress(newSet);
    }
  };

  const clearFilters = () => {
    setSelectedSection('');
    setSelectedCountry('');
    setSelectedGroup('');
    setSearchNumber('');
  };

  const formatStickerList = (stickers: Sticker[]) => {
    if (stickers.length === 0) {
      return 'No tengo estampillas faltantes con estos filtros.';
    }

    const grouped: Record<string, Sticker[]> = {};
    stickers.forEach(sticker => {
      const key = sticker.country || sticker.section;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(sticker);
    });

    return Object.entries(grouped)
      .map(([country, stickers]) => {
        const stickerNumbers = stickers
          .sort((a, b) => a.id - b.id)
          .map(sticker => sticker.number)
          .join(', ');

        return `${country}: ${stickerNumbers}`;
      })
      .join('\n');
  };

  const copyMissingList = async () => {
    const listText = `Estampillas faltantes de ${userName}:` + '\n' + formatStickerList(visibleStickers);

    try {
      await navigator.clipboard.writeText(listText);
      Swal.fire({
        title: 'Lista copiada',
        text: 'Ya puedes compartir tus estampillas faltantes',
        icon: 'success',
        timer: 1600,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        title: 'No se pudo copiar',
        text: 'Selecciona el listado y copialo manualmente',
        icon: 'warning',
        confirmButtonColor: '#9333ea'
      });
    }
  };

  const getProgress = () => {
    const total = stickersData.length;
    const collected = collectedStickers.size;
    const percentage = ((collected / total) * 100).toFixed(1);
    return { total, collected, percentage };
  };

  // Obtener países filtrados por grupo seleccionado
  const getFilteredCountries = () => {
    if (selectedGroup) {
      // Si hay un grupo seleccionado, filtrar países de ese grupo
      const countriesInGroup = Array.from(
        new Set(
          stickersData
            .filter(s => s.group === selectedGroup)
            .map(s => s.country)
        )
      ).sort();
      return countriesInGroup;
    }
    // Si no hay grupo seleccionado, mostrar todos los países
    return getCountries();
  };

  // Limpiar país seleccionado cuando cambie el grupo
  useEffect(() => {
    if (selectedGroup) {
      const countriesInGroup = getFilteredCountries();
      // Si el país seleccionado no está en el grupo actual, limpiarlo
      if (selectedCountry && !countriesInGroup.includes(selectedCountry)) {
        setSelectedCountry('');
      }
    }
  }, [selectedGroup]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-5xl">⚽</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Álbum Panini
          </h1>
          <h2 className="text-xl text-gray-600 mb-6">
            Mundial 2026
          </h2>
          <p className="text-gray-600 mb-4">
            Lleva el control de tu colección de estampillas del Mundial
          </p>
          {!isFirebaseConfigured && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm text-yellow-800">
              <p>⚠️ Modo local: Tu progreso se guarda solo en este navegador</p>
            </div>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  const progress = getProgress();
  const visibleStickers = showMissingOnly
    ? filteredStickers.filter(sticker => !collectedStickers.has(sticker.id))
    : filteredStickers;
  const missingCount = stickersData.length - collectedStickers.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                ⚽ Álbum Mundial 2026
              </h1>
              <p className="text-sm text-gray-600">Usuario: {userName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Progreso */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progreso: {progress.collected} / {progress.total}</span>
              <span>{progress.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-600 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
              <p className="text-sm text-gray-500">
                {showMissingOnly
                  ? `Mostrando ${visibleStickers.length} de ${missingCount} estampillas faltantes`
                  : `Mostrando ${visibleStickers.length} estampillas`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowMissingOnly(!showMissingOnly)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  showMissingOnly
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showMissingOnly ? 'Ver todas' : `Ver faltantes (${missingCount})`}
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg text-sm text-blue-600 hover:bg-blue-50 font-medium"
              >
                Limpiar filtros
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Buscar por número */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número
              </label>
              <input
                type="text"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                placeholder="Ej: 23"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filtro por sección */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sección
              </label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="">Todas</option>
                {getSections().map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>

            {/* Filtro por país */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                País {selectedGroup && <span className="text-xs text-green-600">(Grupo {selectedGroup})</span>}
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="">Todos</option>
                {getFilteredCountries().map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Filtro por grupo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grupo
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="">Todos</option>
                {getGroups().map(group => (
                  <option key={group} value={group}>Grupo {group}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {showMissingOnly && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Listado para compartir</h2>
                <p className="text-sm text-gray-500">
                  Copia tus estampillas faltantes segun los filtros activos.
                </p>
              </div>
              <button
                onClick={copyMissingList}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition"
              >
                Copiar listado
              </button>
            </div>
            <textarea
              readOnly
              value={`Estampillas faltantes de ${userName}:\n${formatStickerList(visibleStickers)}`}
              className="w-full min-h-48 px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}

        {/* Matriz de estampillas por país */}
        <div className="space-y-4">
          {(() => {
            // Agrupar estampillas por país
            const grouped: Record<string, Sticker[]> = {};
            visibleStickers.forEach(sticker => {
              const key = sticker.country || sticker.section;
              if (!grouped[key]) grouped[key] = [];
              grouped[key].push(sticker);
            });

            return Object.entries(grouped).map(([country, stickers]) => (
              <div key={country} className="bg-white rounded-lg shadow p-4">
                <h3 className="font-bold text-gray-800 mb-3">
                  {country} {stickers[0]?.group && `(Grupo ${stickers[0].group})`}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stickers
                    .sort((a, b) => a.id - b.id)
                    .map(sticker => {
                      const isCollected = collectedStickers.has(sticker.id);
                      const code = sticker.number;

                      return (
                        <button
                          key={sticker.id}
                          onClick={() => toggleSticker(sticker.id)}
                          className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                            isCollected
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {code}
                        </button>
                      );
                    })}
                </div>
              </div>
            ));
          })()}
        </div>

        {visibleStickers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{showMissingOnly ? 'No hay estampillas faltantes con estos filtros' : 'No se encontraron estampillas'}</p>
          </div>
        )}
      </main>
    </div>
  );
}
