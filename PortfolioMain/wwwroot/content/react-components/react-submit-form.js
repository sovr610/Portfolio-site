import React, { useState } from 'react';

const cyberpunkStyle = {
  form: {
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#0a0a0a',
    border: '2px solid #00ff00',
    boxShadow: '0 0 10px #00ff00',
    fontFamily: "'Courier New', monospace",
    color: '#00ff00',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #00ff00',
    color: '#00ff00',
    fontSize: '16px',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #00ff00',
    color: '#00ff00',
    fontSize: '16px',
    minHeight: '100px',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#00ff00',
    color: '#0a0a0a',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0a0a0a',
    color: '#00ff00',
    boxShadow: '0 0 10px #00ff00',
  },
};

export const ReactSubmitForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={cyberpunkStyle.form}>
      <div style={cyberpunkStyle.formGroup}>
        <label htmlFor="fullName" style={cyberpunkStyle.label}>Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          style={cyberpunkStyle.input}
        />
      </div>
      <div style={cyberpunkStyle.formGroup}>
        <label htmlFor="email" style={cyberpunkStyle.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={cyberpunkStyle.input}
        />
      </div>
      <div style={cyberpunkStyle.formGroup}>
        <label htmlFor="phone" style={cyberpunkStyle.label}>Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={cyberpunkStyle.input}
        />
      </div>
      <div style={cyberpunkStyle.formGroup}>
        <label htmlFor="message" style={cyberpunkStyle.label}>Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          style={cyberpunkStyle.textarea}
        ></textarea>
      </div>
      <button
        type="submit"
        style={{
          ...cyberpunkStyle.button,
          ...(isHovered ? cyberpunkStyle.buttonHover : {})
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Submit
      </button>
    </form>
  );
};
