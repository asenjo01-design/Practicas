import { useState } from 'react';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../styles/carousel.css';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Importar imágenes de galería
import pepitoImg from './Assets/galeria/pepito.jpeg';
import yoImg from './Assets/galeria/yo.jpeg';

// Importar imágenes de productos
import unicornio1 from './Assets/productos/unicornio-1.jpeg';
import unicornio2 from './Assets/productos/unicornio-2.jpeg';
import unicornio3 from './Assets/productos/unicornio-3.jpeg';

import oso1 from './Assets/productos/oso-1.jpeg';
import oso2 from './Assets/productos/oso-2.jpeg';
import oso3 from './Assets/productos/oso-3.jpeg';

import conejo1 from './Assets/productos/conejo-1.jpeg';
import conejo2 from './Assets/productos/conejo-2.jpeg';
import conejo3 from './Assets/productos/conejo-3.jpeg';

import gato1 from './Assets/productos/gato-1.jpeg';
import gato2 from './Assets/productos/gato-2.jpeg';
import gato3 from './Assets/productos/gato-3.jpeg';

import perro1 from './Assets/productos/perro-1.jpeg';
import perro2 from './Assets/productos/perro-2.jpeg';
import perro3 from './Assets/productos/perro-3.jpeg';

import elefante1 from './Assets/productos/elefante-1.jpeg';
import elefante2 from './Assets/productos/elefante-2.jpeg';
import elefante3 from './Assets/productos/elefante-3.jpeg';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    direccion: '',
    numeroTarjeta: '',
    cvv: ''
  });

  const channels = [
    { name: 'Canal 1', url: 'https://youtube.com/@ilemena85?si=1jUXv_wRidsTVXAU' },
    { name: 'Canal 2', url: 'https://youtube.com/@ileanaarcecampos?si=B6zIZezoYRExC8xl' },
    { name: 'Canal 3', url: 'https://youtube.com/@berthamendez6579?si=IjWKCoccTrFilfO8' },
    { name: 'Canal 4', url: 'https://youtube.com/@cristianasenjo1985?si=kf_w7nb5Pk5PaxgH' }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'shark alex',
      price: 1000,
      images: [unicornio1, unicornio2, unicornio3],
      description: 'las shark alex 1.0'
    },
    {
      id: 2,
      name: 'shark alex 2.0',
      price: 10006,
      images: [oso1, oso2, oso3],
      description: 'la generasion de las shark alex'
    },
    {
      id: 3,
      name: 'shark alexsito',
      price: 3000,
      images: [conejo1, conejo2, conejo3],
      description: 'shark alexsito 2.0'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedToCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.cedula ||
        !formData.direccion || !formData.numeroTarjeta || !formData.cvv) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos del formulario',
        confirmButtonColor: '#9333ea'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Compra exitosa!',
      html: `
        <p>Gracias por tu compra, <strong>${formData.nombre}</strong></p>
        <p>Hemos enviado la confirmación a: <strong>${formData.email}</strong></p>
        <p>Total pagado: <strong>${formatPrice(getTotalPrice())}</strong></p>
      `,
      confirmButtonColor: '#9333ea',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      setCart([]);
      setShowCheckout(false);
      setFormData({
        nombre: '',
        email: '',
        cedula: '',
        direccion: '',
        numeroTarjeta: '',
        cvv: ''
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Pepito Bonito
          </h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Gallery Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pepito Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                <img
                  src={pepitoImg}
                  alt="Pepito"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Este es Pepito</h2>
                <p className="text-gray-600 leading-relaxed">
                  Es muy bonito, tiene ojos rojos y un pelo blanco
                </p>
              </div>
            </div>

            {/* About Me Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <img
                  src={yoImg}
                  alt="Yo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Éste soy yo</h2>
                <p className="text-gray-600 leading-relaxed">
                  Tengo cuatro canales, tengo muchos peluches y juego muchos juegos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products/Sales Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              Tienda de Shark Alex
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra genial colección de shark Alex
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const sliderSettings = {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                autoplay: false
              };

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <Slider {...sliderSettings}>
                      {product.images.map((image, index) => (
                        <div key={index} className="aspect-square">
                          <img
                            src={image}
                            alt={`${product.name} - imagen ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition font-medium"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* YouTube Channels Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
              Mis Canales de YouTube
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visita mis canales para descubrir contenido increíble
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {channels.map((channel, index) => (
              <a
                key={index}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl shadow-md overflow-hidden transform transition hover:scale-105 hover:shadow-xl"
              >
                <div className="bg-gradient-to-br from-red-500 to-pink-500 p-8 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white transform group-hover:scale-110 transition"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition">
                    {channel.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Ver canal →</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Cart Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Carrito de Compras</h2>
              <button
                onClick={() => setShowCart(false)}
                className="hover:bg-white/20 rounded-full p-2 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-purple-600 font-bold mt-1">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="font-bold text-gray-800 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition self-start"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-gray-600">Total:</span>
                  <span className="text-3xl font-bold text-purple-600">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition"
                >
                  Proceder al Pago
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Form Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Información de Pago</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="hover:bg-white/20 rounded-full p-2 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleSubmitPayment} className="space-y-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="Juan Pérez"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>

                {/* Cédula */}
                <div>
                  <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 mb-1">
                    Cédula *
                  </label>
                  <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="1-2345-6789"
                    required
                  />
                </div>

                {/* Dirección */}
                <div>
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección *
                  </label>
                  <textarea
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition resize-none"
                    placeholder="San José, Costa Rica"
                    required
                  />
                </div>

                {/* Número de Tarjeta */}
                <div>
                  <label htmlFor="numeroTarjeta" className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Tarjeta *
                  </label>
                  <input
                    type="text"
                    id="numeroTarjeta"
                    name="numeroTarjeta"
                    value={formData.numeroTarjeta}
                    onChange={handleInputChange}
                    maxLength={16}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                {/* CVV */}
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV *
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                    placeholder="123"
                    required
                  />
                </div>

                {/* Total */}
                <div className="bg-purple-50 rounded-lg p-4 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">Total a pagar:</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition mt-6"
                >
                  Confirmar Pago
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>© 2026 Pepito Bonito. Hecho con ❤️</p>
        </div>
      </footer>
    </div>
  );
}