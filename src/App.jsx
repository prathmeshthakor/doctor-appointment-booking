import { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    doctor: "",
    where: "",
    when: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("SUBMITTING FORM", form); 

    if (!form.doctor || !form.where || !form.when) {
      alert("Please complete all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        form
      );
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setLoading(false);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return <h2 className="center">Booking Session...</h2>;
  }

  if (success) {
    return (
      <div className="center">
        <h2>Appointment Booked Successfully</h2>
        <button onClick={() => setSuccess(false)}>
          Cancel Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <h1>Book a Session</h1>
      <p>
        Fill in the form below to book a virtual session with your doctor
      </p>

      <form onSubmit={handleSubmit}>
        <h3>Basic Info</h3>

        <input
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          required
        />

        <input
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <h3>Doctor</h3>
        <select
          name="doctor"
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>
          <option value="Dr. John Hopkins">Dr. John Hopkins</option>
          <option value="Dr. Strange">Dr. Strange</option>
          <option value="Dr. Jack">Dr. Jack</option>
        </select>

        {form.doctor && (
          <>
            <h3>Where?</h3>

            <label>
              <input
                type="radio"
                name="where"
                value="Google Meet"
                onChange={handleChange}
              />
              Google Meet
            </label>

            <label>
              <input
                type="radio"
                name="where"
                value="Phone"
                onChange={handleChange}
              />
              Phone
            </label>

            <h3>When?</h3>
            <input
              type="datetime-local"
              name="when"
              onChange={handleChange}
              required
            />
          </>
        )}

        
        <button
          type="submit"
          disabled={!form.doctor || !form.where || !form.when}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default App;


