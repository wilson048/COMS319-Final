function Login() {
  return (
    <div class="container">
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Add new Product</h4>

        <div class="row g-3">
          <div class="col-sm-6">
            <label for="newID" class="form-label">
              ID
            </label>
            <input
              type="text"
              class="form-control"
              id="newID"
              placeholder=""
              required
            ></input>
            <div class="invalid-feedback">Valid ID is required</div>
          </div>

          <div class="col-sm-6">
            <label for="newTitle" class="form-label">
              Title
            </label>
            <input
              type="text"
              class="form-control"
              id="newTitle"
              placeholder=""
              required
            ></input>
            <div class="invalid-feedback">Valid Title is required.</div>
          </div>

          <div class="col-12">
            <label for="newPrice" class="form-label">
              Price
            </label>
            <div class="input-group has-validation">
              <input
                type="text"
                class="form-control"
                id="newPrice"
                placeholder=""
                required
              ></input>
              <div class="invalid-feedback">Your price is required.</div>
            </div>
          </div>

          <div class="col-12">
            <label for="newDescription" class="form-label">
              Description
            </label>
            <input
              type="text"
              class="form-control"
              id="newDescription"
              placeholder=""
              required
            ></input>
            <div class="invalid-feedback">
              Please enter a valid Description address for shipping updates.
            </div>
          </div>

          <div class="col-12">
            <label for="newCategory" class="form-label">
              Category
            </label>
            <input
              type="text"
              class="form-control"
              id="newCategory"
              placeholder=""
              required
            ></input>
            <div class="invalid-feedback">Please enter your Category.</div>
          </div>
          <div class="col-12">
            <label for="newImage" class="form-label">
              Image URL
            </label>
            <input
              type="text"
              class="form-control"
              id="newImage"
              placeholder=""
              required
            ></input>
            <div class="invalid-feedback">Please enter your Image URL.</div>
          </div>
          <div class="col-12">
            <label for="newRate" class="form-label">
              Rate
            </label>
            <input
              type="text"
              class="form-control"
              id="newRate"
              placeholder=""
              required
            ></input>
          </div>

          <div class="col-12">
            <label for="newCount" class="form-label">
              Count
            </label>
            <input
              type="text"
              class="form-control"
              id="newCount"
              placeholder=""
              required
            ></input>
          </div>
        </div>

        <hr class="my-4"></hr>

        <button
          class="w-100 btn btn-primary btn-lg"
          onClick={() => addOneProduct()}
        >
          Add to MongoDB
        </button>
      </div>
    </div>
  );
}

export default Login;
