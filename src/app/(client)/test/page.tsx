import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ITAble {
  id: string;
  title: string;
  body: string;
}
const page = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: ITAble[] = await res.json();
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="border border-gray-50">
            <TableHead>id</TableHead>
            <TableHead>title</TableHead>
            <TableHead className="text-center">body</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
