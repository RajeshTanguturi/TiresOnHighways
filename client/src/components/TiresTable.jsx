import { Link } from "react-router-dom";


const TireTable = ({ tires }) =>{
    return (
        <table className="table table-striped table-bordered table-hover table-responsive">
            <thead>
                <tr class="bg-success" >
                
                    <th>No</th>
                    <th>Registration Number</th>
                    <th>Label</th>
                    <th>Tire Damage</th>
                    <th>Toll Plaza</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
            <tbody>
                {tires.map((tire , index) =>(
                    <tr key ={tire._id}>
                        <td>{index+1}</td>
                        <td>{tire.regisNo}</td>
                        <td>{tire.label}</td>
                        <td>{tire.damage}</td>
                        <td>{tire.tollPlaza}</td>
                        <td>{tire.phoneNo}</td>
                        <td>
                            <div>
                                <Link to={`/tireReports/details/${tire._id}`}>view report</Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TireTable;