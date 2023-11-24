import "./Assign.css";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";

const Assign = () => {
  const [option, setOption] = useState("patient");
  const [selected, setSelected] = useState(0);
  const [listInfo, setListInfo] = useState([]);
  const [searchInfoList, setSearchInfoList] = useState([]);
  const [searchInfo, setSearchInfo] = useState(0);

  useEffect(() => {
    console.log(option);
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3600/admin/search/${option}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      setListInfo(data);
      setSearchInfoList(data);
    };
    fetchData();
  }, [option]);

  const handleSearch = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setSearchInfoList(listInfo);
    } else {
      setSearchInfoList(
        listInfo.filter((element) => element.includes(e.target.value))
      );
    }
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <div className="assign">
      <div className="assign-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for patient by id"
            onChange={handleSearch}
          />
          <select id="example" name="example" onChange={handleOptionChange}>
            <option value="patient">patient</option>
            <option value="nurse">nurse</option>
          </select>
        </div>
        <div className="info-container">
          {searchInfoList.map((info, index) => (
            <div className="info" key={index}>
              <div className="info-basic">
                <div>{`${info?.Fname} ${info?.MI} ${info?.Lname}`}</div>
                <div>{info?.SSN || info?.["Employee ID"]}</div>
              </div>
              <div className="icons">
                <FaRegCalendarAlt />
                <AiOutlineDelete size={17} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assign;
