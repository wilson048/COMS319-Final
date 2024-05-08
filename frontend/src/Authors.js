function Authors() {
  return (
    <div class="container marketing">
      <div class="row">
        <div class="col-lg-4">
          {/* <svg
          class="bd-placeholder-img rounded-circle"
          width="140"
          height="140"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          
        </svg> */}
          <img
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            src="/Wilson.PNG"
          ></img>
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
          <h2 class="fw-normal">Wilson Chu (wvchu)</h2>
          <p>Team Member for this Assignment</p>
          <p>
            <a class="btn btn-secondary" href="https://github.com/wilson048">
              My GitHub &raquo;
            </a>
          </p>
        </div>
        <div class="col-lg-4">
          <img
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            src="/Anton.jpg"
          ></img>
          <h2 class="fw-normal">Anton Kordick (antkord)</h2>
          <p>Team Member for this Assignment</p>
          <p>
            <a class="btn btn-secondary" href="https://github.com/antzmon">
              My GitHub &raquo;
            </a>
          </p>
        </div>
        <div class="col-lg-4">
          <img
            class="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            src="/professor.PNG"
          ></img>
          <h2 class="fw-normal">
            Professor Abraham Netzahualcoy Aldaco Gastelum
          </h2>
          <p>Professor for the course COMS319</p>
          <p>
            <a class="btn btn-secondary" href="#">
              View details &raquo;
            </a>
          </p>
        </div>
      </div>
      <hr class="featurette-divider"></hr>

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading fw-normal lh-1">
            Fakestore Admin Webiste{" "}
            <span class="text-body-secondary">Assignment 3</span>
          </h2>
          <p class="lead">
            This website consists of 4 different views. The first view simply
            displays all products from MongoDB. The second view consists of a
            form in order to add a new product to MongoDB. The third view
            consits of the first view's items along with a an option to update a
            item's price indivdually to MongoDB. The last view consits of the
            first view's items along with corresponding delete buttons in order
            to delete an item from MongoDB.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authors;
