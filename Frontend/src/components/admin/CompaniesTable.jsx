/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Edit2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"


const CompaniesTable = ({ Companies }) => {




    return (
        <div className="">
            <Table >
                <TableCaption>
                    A list of your registered companies
                </TableCaption>
                <TableHeader >
                    <TableRow >
                        <TableHead>
                            Logo
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">


                    {
                        Companies?.map((company) => (

                            <tr key={company._id}>
                                <TableCell className="cursor-pointer"><Avatar>
                                    <AvatarImage src={company.logo ? company.logo : "https://github.com/shadcn.png"} />
                                </Avatar></TableCell>
                                <TableCell>{company.companyname}</TableCell>
                                <TableCell>{company.createdAt}</TableCell>
                                <TableCell className="">

                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32" >
                                            <div className="flex items-center gap-2 w-fit cursor-pointer">
                                                <Edit2 className="w-4 " />
                                                <span>Edit</span>

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

export default CompaniesTable