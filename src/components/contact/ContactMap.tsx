export function ContactMap() {
  return (
    <section className="relative w-full">
      {/* Top gradient overlay for seamless blend */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-black-rich to-transparent" />

      <iframe
        title="Locația Core Strategic Consulting pe hartă — București, România"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d91158.11209995057!2d26.0279!3d44.4268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucure%C8%99ti!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro"
        className="h-[300px] w-full border-0 lg:h-[400px]"
        style={{ filter: 'grayscale(80%) contrast(1.1) brightness(0.7)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )
}
