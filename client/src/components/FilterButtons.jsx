import { useContext } from "react";
import { SrchContext } from '../context/SrchContext';

const FilterButtons = () => {
    const { FilterParam, setFilterParam } = useContext(SrchContext);
    return (
        <div className="filter">
            <button className={FilterParam === "All" ? "active" : ""} onClick={() => setFilterParam("All")}>All</button>
            <button className={FilterParam === "AAA" ? "filAAA active" : "filAAA"} onClick={() => setFilterParam("AAA")}>AAA</button>
            <button className={FilterParam === "BBB" ? "filBBB active" : "filBBB"} onClick={() => setFilterParam("BBB")}>BBB</button>
            <button className={FilterParam === "CCC" ? "filCCC active" : "filCCC"} onClick={() => setFilterParam("CCC")}>CCC</button>
            <button className={FilterParam === "DDD" ? "filDDD active" : "filDDD"} onClick={() => setFilterParam("DDD")}>DDD</button>
            <button className={FilterParam === "EEE" ? "filEEE active" : "filEEE"} onClick={() => setFilterParam("EEE")}>EEE</button>
            <button className={FilterParam === "FFF" ? "filFFF active" : "filFFF"} onClick={() => setFilterParam("FFF")}>FFF</button>
            <button className={FilterParam === "GGG" ? "filGGG active" : "filGGG"} onClick={() => setFilterParam("GGG")}>GGG</button>
            <button className={FilterParam === "HHH" ? "filHHH active" : "filHHH"} onClick={() => setFilterParam("HHH")}>HHH</button>
        </div>
    )
}

export default FilterButtons;