/* eslint-disable react/prop-types */
import { Edit2, Eye, MoreHorizontal } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import {  useNavigate } from "react-router-dom"

const AdminJobsTable = ({ jobs }) => {

const navigate = useNavigate()

    return (
        <div className="">
            <Table >
                <TableCaption>
                    A list of your recent posted jobs
                </TableCaption>
                <TableHeader >
                    <TableRow >
                        <TableHead>
                            Company
                        </TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">


                    {
                        jobs?.map((job) => (

                            <tr key={job._id}>
                                <TableCell className="cursor-pointer">{job.company.companyname}</TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.createdAt.split('T')[0]}</TableCell>
                                <TableCell className="">

                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-right" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32" >
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-4 w-fit cursor-pointer">

                                                <Edit2 className="w-4 " />
                                                <span className="">Edit</span>
                                            </div>

                                            <div onClick={() => navigate(`/admin/job/${job._id}/applicants`)} className="flex items-center gap-4 w-fit cursor-pointer">
                                                <Eye className="w-4" />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>

                            </tr>
                        )
                        )

                    }




                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable