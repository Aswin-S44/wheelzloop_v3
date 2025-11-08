import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SearchIcon from "@mui/icons-material/Search";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Header() {
  return (
    <div>
      <header>
        <div className="header-top">
          <div class="container">
            <div class="row py-4 pb-0 pb-sm-4 align-items-center ">
              <div class="col-sm-4 col-lg-3 text-center text-sm-start">
                <div class="main-logo">
                  <a href="index.html">
                    {/* <img
                      src="/images/logo.png"
                      className="brand-name"
                      // style={logoSize}
                      alt="Logo"
                      title="brand-logo"
                      style={{ height: "70px", width: "121px" }}
                    /> */}
                    <h4 style={{ color: "#00bcbf", fontSize: "45px" }}>
                      Wheelzloop
                    </h4>
                  </a>
                </div>
              </div>

              <div class="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
                <div class="">
                  <form
                    id="search-form"
                    class="text-center d-flex align-items-center"
                    action=""
                    method=""
                  >
                    <input
                      type="text"
                      class="border-2 bg-transparent p-3 search-input"
                      placeholder="Search by name, brand etc"
                      style={{ border: "1px solid #fe6a2b" }}
                    />
                    <span className="search-box">
                      <SearchIcon style={{ color: "#fff" }} />
                    </span>
                  </form>
                </div>
              </div>

              <div class="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
                <div class="support-box text-end d-none d-xl-block">
                  <span className="secondary-text">Follow us on </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                    }}
                  >
                    <div>
                      <MailOutlineIcon />
                    </div>
                    <div>
                      <InstagramIcon />
                    </div>
                    <div>
                      <FacebookIcon />
                    </div>
                    <div>
                      <XIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid">
          <hr class="m-0" />
        </div>

        <div className="header-bottom">
          <div class="container header-bottom">
            <nav class="main-menu d-flex navbar navbar-expand-lg ">
              <div class="d-flex d-lg-none align-items-end mt-3">
                <ul class="d-flex justify-content-end list-unstyled m-0">
                  <li>
                    <a href="account.html" class="mx-3">
                      <iconify-icon
                        icon="healthicons:person"
                        class="fs-4"
                      ></iconify-icon>
                    </a>
                  </li>
                  <li>
                    <a href="wishlist.html" class="mx-3">
                      <iconify-icon
                        icon="mdi:heart"
                        class="fs-4"
                      ></iconify-icon>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="mx-3"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasCart"
                      aria-controls="offcanvasCart"
                    >
                      <FavoriteBorderIcon />
                      <span class="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                        03
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
              >
                <div class="offcanvas-header justify-content-center">
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="offcanvas-body justify-content-between">
                  <ul class="navbar-nav menu-list list-unstyled d-flex gap-md-3 mb-0">
                    <li class="nav-item">
                      <a
                        href="index.html"
                        class="nav-link active"
                        style={{ color: "#fff" }}
                      >
                        Home
                      </a>
                    </li>
                    <li class="nav-item dropdown">
                      <a
                        class="nav-link dropdown-toggle"
                        role="button"
                        id="pages"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Pages
                      </a>
                      <ul class="dropdown-menu" aria-labelledby="pages">
                        <li>
                          <a href="index.html" class="dropdown-item">
                            About Us
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Shop
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Single Product
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Cart
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Wishlist
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Checkout
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Blog
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Single Post
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Contact
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            FAQs
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Account
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Thankyou
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Error 404
                          </a>
                        </li>
                        <li>
                          <a href="index.html" class="dropdown-item">
                            Styles
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li class="nav-item">
                      <a href="index.html" class="nav-link">
                        Shop
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="index.html" class="nav-link">
                        Blog
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="index.html" class="nav-link">
                        Contact
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="index.html" class="nav-link">
                        Others
                      </a>
                    </li>
                  </ul>

                  <div class="d-none d-lg-flex align-items-end">
                    <ul class="d-flex justify-content-end list-unstyled m-0">
                      <li>
                        <a href="index.html" class="mx-3">
                          <iconify-icon
                            icon="healthicons:person"
                            class="fs-4"
                          ></iconify-icon>
                        </a>
                      </li>
                      <li>
                        <a href="index.html" class="mx-3">
                          <iconify-icon
                            icon="mdi:heart"
                            class="fs-4"
                          ></iconify-icon>
                        </a>
                      </li>

                      <li class="">
                        <a
                          href="index.html"
                          class="mx-3"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasCart"
                          aria-controls="offcanvasCart"
                        >
                          <FavoriteBorderIcon style={{ color: "#fff" }} />
                          <span class="position-absolute translate-middle badge rounded-circle pt-2">
                            03
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
