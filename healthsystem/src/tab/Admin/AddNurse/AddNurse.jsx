const AddNurse = () => {
  const [formData, setFormData] = useState({
    Fname: '',
    MI: '',
    Lname: '',
    EmployeeID: '',
    Age: '',
    Gender: '',
    Phone: '',
    Address: '',
    Username: '',
    Password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3600/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); 
      console.log(data);
      if (response.ok) {
        // The data was successfully sent to the server, now you can handle the CSV file creation on the server side.
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-nurse">
      <div className="add-nurse-content">
        <h1>Add Nurse</h1>
        <form onSubmit={handleSubmit}>
          {/* Your input fields here */}
          <label>
            First Name:
            <input type="text" name="Fname" value={formData.Fname} onChange={handleChange} />
          </label>
          {/* Repeat similar lines for other input fields */}
          
          <button type="submit">Add Nurse</button>
        </form>
      </div>
    </div>
  );
};

export default AddNurse;
