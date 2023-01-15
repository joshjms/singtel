export default function Navbar() {
    const navbar_menu = [
        {name: "Overview", img: "", url:""},
        {name: "Inventory", img: "shipping.png", url:""},
        {name: "Data", img: "database.png", url:""},
        {name: "Other", img: "", url:""},
    ];

    return (
        <div 
          className="side-nav d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" 
        >
          <div className="d-flex align-items-start justify-content-center nav-logo">
            <img src="singtel-logo.png" width="125px"/>
          </div>
          <ul className="nav nav-pills flex-column mb-auto">
            {navbar_menu.map((menu, index) => (
              <li className="nav-item mb-2" key={index}>
                <a href={menu.url} className="d-flex shadow-lg align-items-center nav-link" aria-current="page">
                  <div class="me-3">
                    <img className="menu-logo" src={menu.img} />
                  </div>
                  <div>
                    {menu.name}
                  </div>
                </a>
              </li>
            ))}
          </ul>
          
        </div>
    );
}