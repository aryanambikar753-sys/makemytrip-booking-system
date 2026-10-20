import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Profile.css";

function Profile() {
  const navigate = useNavigate();

  const savedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] = useState(
    savedUser.name || "User Name"
  );

  const [email] = useState(
    savedUser.email || "user@gmail.com"
  );

  const [mobile, setMobile] = useState(
    savedUser.mobile || "+91 9876543210"
  );

  const [city, setCity] = useState(
    savedUser.city || "Mumbai"
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    const updatedUser = {
      ...savedUser,
      name,
      email,
      mobile,
      city,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h2>My Profile</h2>

        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Profile"
          className="profile-img"
        />

        {!isEditing ? (
          <>
            <h3>{name}</h3>

            <p>
              <strong>Email:</strong> {email}
            </p>

            <p>
              <strong>Mobile:</strong> {mobile}
            </p>

            <p>
              <strong>City:</strong> {city}
            </p>

            <button
              className="profile-edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>

            <button
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </>
        ) : (
          <div className="profile-edit-form">

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              disabled
            />

            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
            />

            <button onClick={handleSave}>
              Save Changes
            </button>

            <button
              className="profile-cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;