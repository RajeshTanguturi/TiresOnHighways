import React from "react";

const Contact = () => {
  return (
    <div className="Feedback">
      <main>
        <h1>Feedback</h1>
        <h6>
          We value your feedback! Your insights help us improve our services and
          make your experience on Telangana's highways Safer
        </h6>

        <form>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Email
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Email
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Feedback
            </label>
            <textarea
              class="form-control"
              placeholder="enter you query here..."
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <button type ="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
