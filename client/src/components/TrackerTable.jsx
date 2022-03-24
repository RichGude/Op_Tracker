import React, { useEffect, useState, useContext } from 'react';
import operFinder from '../apis/operFinder';
import { OperContext } from '../context/OperContext';
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

const TrackerTable = () => {

    // Call upon the commodities state object from with the Table
    // (all server fetching and updating will occurs in this component vice the TrackerChart)
    const { commodities, setCommodities, addCommodities } = useContext(OperContext);

    // Define a state for saving the id of the commodity information for updating the database
    const [ commID, setCommID ] = useState(1)
    // Define a state for saving identifying when the Tracker Data is loaded to know when to show data
    const [ isLoaded, setIsLoaded ] = useState(false)

    // Fetch commidity data from tracker table in database
    useEffect(() => {
        const fetchData = async () => {
            try {
                // The axios get request is added to the baseURL value
                const response = await operFinder.get("api/v1/tracker/");
                setCommodities(response.data.data);
                setIsLoaded(true);
            } catch (e) {
                console.log(e);
            };
        };
        fetchData();
    }, []);

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

    // A function for returning the header column of the table
    const tableHeader = () => {
        return (
            <thead>
                {Object.keys(commodities[0]).map((header, index) => {
                    return (
                        <th key={index}>{header}</th>
                    );
                })} 
            </thead>
    );};

    // A function for the table rows (interating through each commodity in commodities, and each value in each commodity)
    const tableBody = () => {
        // Initialize an empty array to store every row of entries
        let bodyList = [];
        commodities.map(commodity => {
            let feature_list = [];
            // For each feature in each commodity, add to the feature to list and push to bodyList 
            Object.keys(commodity).map(feature_key => (
                feature_list.push(
                    <td key={(commodity.id.toString()+feature_key)}>
                        {commodity[feature_key]}
                    </td>
                )
            ));
            bodyList.push(<tr>{feature_list}</tr>);
        })
        
        return bodyList;
    };

    // Define a custom function for rendering Tracker Table (necessary for small time before fetch request of data)
    const renderTable = () => {
        if (!isLoaded) {
            return <div>Loading</div>
        } else {
            return (
            <div className="table-responsive">
            <table className="table table-striped table-sm">
                {tableHeader()}
                {tableBody()}
            </table>
        </div>
    )}};
    
    // ## Define elements for displaying an interactive table ## //
    
    // Define elements for filtering and sorting
    function GlobalFilter({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
      }) {
        const count = preGlobalFilteredRows.length
        const [ value, setValue ] = React.useState(globalFilter)
        const onChange = useAsyncDebounce(value => {
            setGlobalFilter(value || undefined)
        }, 200)

        return (
            <span>Search:{' '}
                <input
                    value={value || ""}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                    style={{
                        fontSize: '1.1rem',
                        border: '0',
                    }}/>
            </span>
        )}
    
    // Define a default UI for filtering
    function DefaultColumnFilter({
        column: { filterValue, preFilteredRows, setFilter },
    }) {
        const count = preFilteredRows.length

        return (
            <input
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                placeholder={`Search ${count} records...`} />
    );};

    const defaultColumn = React.useMemo(
        () => ({
          // Set up default Filter UI
          Filter: DefaultColumnFilter,
        }),
        []
    )
    
    // Define a function that only runs after the data 

    // Define list of objects to coincide with ReactTable Format (dumb that I have to write this all out...)
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
    ]);
    
    const data = React.useMemo(() => commodities);
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        },
        useFilters,
        useGlobalFilter,
        useSortBy
    );
    const loadedTable = () => {
        return (
            <div>
            <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            style={{
                                borderBottom: 'solid 3px red',
                                color: 'black',
                            }}
                        >
                            {column.render('Header')}
                            <span>
                            {column.isSorted
                                ? column.isSortedDesc
                                    ? '🔽'
                                    : '🔼'
                                : ''}
                        </span>
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                        </th>
                    ))}
                    </tr>
                ))}
                <tr>
                <th
                    colSpan={visibleColumns.length}
                    style={{
                    textAlign: 'left',
                    }}
                >
                    <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    />
                </th>
                </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                        return (
                            <td
                                {...cell.getCellProps()}
                                style={{
                                    padding: '10px',
                                    border: 'solid 1px gray',
                                }}>
                                {cell.render('Cell')}
                            </td>
                        )
                        })}
                    </tr>
                )
                })}
                </tbody>
            </table>
            </div>
        );
    };

    const userTable = () => {
        if (!isLoaded) {
            return <div>Loading</div>
        } else {
            return (
                <div>
                <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    color: 'black',
                                }}
                            >
                                {column.render('Header')}
                                <span>
                                {column.isSorted
                                    ? column.isSortedDesc
                                        ? '🔽'
                                        : '🔼'
                                    : ''}
                            </span>
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                        </tr>
                    ))}
                    <tr>
                    <th
                        colSpan={visibleColumns.length}
                        style={{
                        textAlign: 'left',
                        }}
                    >
                        <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        />
                    </th>
                    </tr>
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return (
                                <td
                                    {...cell.getCellProps()}
                                    style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                    }}>
                                    {cell.render('Cell')}
                                </td>
                            )
                            })}
                        </tr>
                    )
                    })}
                    </tbody>
                </table>
                </div>
            );
    };};


    return (<div className='main'>
        <h2>Tabular Technical Operations Data</h2>
        {userTable()}        
    </div>);
};

export default TrackerTable;