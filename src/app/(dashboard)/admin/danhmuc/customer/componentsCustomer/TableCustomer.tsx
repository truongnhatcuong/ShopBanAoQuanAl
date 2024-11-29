import React from "react";

import UpdateCustomer from "./UpdateCustomer";
import DeleteCustomer from "./DeleteCustomer";

interface ICustomer {
  customer_id: number;
  name: string;
  email: string;
  phone: number;
  address: string;
  username: string;
  password: string;
}
interface ITableCustomer {
  customer: ICustomer[];
  reloadData: () => void;
}
const TableCustomer = (props: ITableCustomer) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>email</th>
            <th>phone</th>
            <th>address</th>
            <th>AcTion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {props.customer.map((item) => (
            <tr key={item.customer_id}>
              <th>{item.customer_id}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td className="flex space-x-4 text-2xl hover:cursor-pointer">
                <UpdateCustomer {...item} reloadData={props.reloadData} />
                {/* xoá  */}
                <DeleteCustomer
                  customer_id={item.customer_id}
                  reloadData={props.reloadData}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCustomer;
