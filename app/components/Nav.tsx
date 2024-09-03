export default function Nav() {
  return (
    <nav className="w-full p-4 bg-gray-800 text-white ">
      <ul className="flex justify-evenly px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/image-generation">Image Generation</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/pricing">Pricing</a>
        </li>{" "}
        
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
