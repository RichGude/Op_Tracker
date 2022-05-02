import React, { useEffect, useState, useContext } from 'react';
import operFinder from '../apis/operFinder';
import Chart from 'react-apexcharts';
import { OperContext } from '../context/OperContext';
import { AuthoContext } from '../context/AuthContext';
import { useTable, useSortBy, useFilters, } from 'react-table';
import ModalTrack from './ModalTrack';

const TrackerTable = () => {

    // Call upon the commodities state object from with the Table
    // (all server fetching and updating will occurs in this component vice the TrackerChart)
    const { commodities, setCommodities, addCommodities } = useContext(OperContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthoContext);

    // Define a state for saving the id of the tracker information for updating the database
    const [ trackID, setTrackID ] = useState(1)
    // Define a state for saving identifying when the Tracker Data is loaded to know when to show data
    const [ isLoaded, setIsLoaded ] = useState(false)
    // Define a state for showing a pop-up modal when editing tracker data
    const [ showTrackModal, setShowTrackModal ] = useState(false);
    // Define a state for setting whether the modal is for adding a new record (true) or updating an old (false)
    const [ trackModalAdd, setTrackModalAdd ] = useState(true);

    // Define a state for saving the chart data of the commodity information in the proper form
    const [ chartData, setChartData ] = useState({
        // Define a dummy series set before the real data is pulled from the 
        series: [{
            name: 'XXX',
            data: [1]
          }],
        options: {
            chart: {
                type: 'bar',
                height: 450,
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
                }
            }],
            plotOptions: {
                bar: {
                horizontal: false,
                borderRadius: 10
                },
            },
            xaxis: {
                categories: ['XXX'],
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            fill: {
                opacity: 1
            }
        },
    });

    // Fetch commidity data from tracker table in database - only do this once on page load
    useEffect(() => {
        const fetchTrackerData = async () => {
            try {
                // The axios get request is added to the baseURL value
                const response = await operFinder.get("api/v1/tracker/");
                setCommodities(response.data.data);
                setIsLoaded(true);
            } catch (e) {
                console.log(e);
            };
        };
        fetchTrackerData();
        
    }, []);

    // Update chart data whenever 'commodities' changes after first render
    useEffect(() => {
        if (isLoaded) {
            // Specify Chart data object with 'series' and 'options' parameters
            let newData = commodities.map((elem) => {
                // Use destructuring to pull out all just metric data
                const { id, AAA, ...metricData } = elem;
                return {
                    name: AAA,
                    data: Object.values(metricData)
                }
            })
            // Specify categories titles
            let cateNames = Object.keys(commodities[0]).slice(2);

            setChartData(
                {
                    series: newData,
                    options: {
                        ...chartData.options,
                        xaxis: {
                            categories: cateNames
                        }
                    }
                }
            );}
    }, [commodities, isLoaded])

    // Update Function: Open tracker modal and fill with current commodity data
    const handleUpdate = (e, id) => {
        setTrackID(id);
        setTrackModalAdd(false);
        setShowTrackModal(!showTrackModal);
    };

    // Add Function: Open tracker (Table) modal
    const handleAdd = (e) => {
        setTrackModalAdd(true);
        setShowTrackModal(!showTrackModal);
    };

    // Define function for deleting a record from database
    const handleDelete = async (e, id) => {
        try {
            const response = await operFinder.delete(`api/v1/tracker/${id}`);
            console.log("Commodity successfully deleted");
            setCommodities(commodities.filter(commodity => {
                return commodity.id !== id;
            }));
        } catch (e) {
            console.log(e);
        };
    };

    // Define list of objects to coincide with ReactTable Format - Changes to Tracker table (adding a column) must be reflected here
    const columns = React.useMemo(() => [
        {   Header: 'AAA',
            accessor: 'AAA'},
        {   Header: 'BBB',
            accessor: 'BBB'},
        {   Header: 'CCC',
            accessor: 'CCC'},
        {   Header: 'DDD',
            accessor: 'DDD'},
        {   Header: 'EEE',
            accessor: 'EEE'},
        {   Header: 'FFF',
            accessor: 'FFF'},
        {   Header: 'GGG',
            accessor: 'GGG'},
        {   Header: 'HHH',
            accessor: 'HHH'},
        {   Header: 'III',
            accessor: 'III'},
        {   Header: 'JJJ',
            accessor: 'JJJ'},
        {   Header: 'KKK',
            accessor: 'KKK'},
        {   Header: 'LLL',
            accessor: 'LLL'},
        {   Header: 'MMM',
            accessor: 'MMM'},
        {   Header: 'NNN',
            accessor: 'NNN'},
        {   Header: 'OOO',
            accessor: 'OOO'},
        {   Header: 'PPP',
            accessor: 'PPP'},
        {   Header: 'QQQ',
            accessor: 'QQQ'},
        {   Header: 'RRR',
            accessor: 'RRR'},
        {   Header: 'SSS',
            accessor: 'SSS'},
        {   Header: 'TTT',
            accessor: 'TTT'},
        {   Header: 'UUU',
            accessor: 'UUU'}
    ], []);
    
    // Define data in a memo-ized format for displaying in react
    const data = React.useMemo(() => commodities, [commodities]);
    
    // define the Table structure with the useTable hook
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter
    } = useTable({
            columns,
            data,
        },
        useFilters,
        useSortBy);

    // Define a custom function for rendering Tracker Table (necessary for small time before fetch request of data)
    const renderTable = () => {
        if (!isLoaded) {
            return <div>Loading</div>
        } else {
            return (
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    // Add sorting option for each column
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={
                                        column.isSorted ?
                                            column.isSortedDesc ? "sort-desc" : "sort-asc"
                                        : ""
                                    }>{column.render("Header")}
                                    <span>
                                        {column.isSorted ?
                                            column.isSortedDesc ? '🔽' : '🔼'
                                        : ''}
                                    </span>
                                    </th>
                                ))}
                                {/* Add columns for update and delete buttons if Auth is logged in */}
                                {isLoggedIn ? (<>
                                    <th colSpan="1" role="columnheader">Update</th>
                                    <th colSpan="1" role="columnheader">Delete</th>
                                    </>) : null}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                                {isLoggedIn ? (<>
                                    <td role="cell"><button onClick={(e) => handleUpdate(e, row.original.id)} className='btn btn-warning'>Update</button></td>
                                    <td role="cell"><button onClick={(e) => handleDelete(e, row.original.id)} className='btn btn-danger'>Delete</button></td>
                                    </>) : null}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        };

    return (
        <div className='main'>
            <h2>Chart Technical Operations Data</h2>
            <Chart options={chartData.options} series={chartData.series} type="bar" height="600" />
            <h2>Tabular Technical Operations Data</h2>
            {renderTable()}
            <div className='container-fluid bottom'>
                {isLoggedIn ? (
                    <button onClick={(e) => handleAdd(e)} className='trackAdd'>🔽 ADD LINE</button>
                ) : ''}
            </div>
            <ModalTrack trackModalAdd={trackModalAdd} showTrackModal={showTrackModal} setShowTrackModal={setShowTrackModal} trackID={trackID} />
        </div>);
};

export default TrackerTable;