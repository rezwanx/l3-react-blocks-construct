import { Eye, Download } from "lucide-react"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "components/ui/table"

export default function FinanceInvoices() {
  const invoices = [
    {
      id: "INV-1005",
      customer: "Acme Corp",
      issueDate: "15.02.2025",
      dueDate: "15.03.2025",
      amount: "CHF 12,500.00",
      status: "Overdue",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "INV-1004",
      customer: "Beta Industries",
      issueDate: "20.01.2025",
      dueDate: "20.02.2025",
      amount: "CHF 12,500.00",
      status: "Unpaid",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "INV-1003",
      customer: "Global Solutions",
      issueDate: "01.03.2025",
      dueDate: "20.01.2025",
      amount: "CHF 12,500.00",
      status: "Paid",
      paymentMethod: "PayPal",
    },
    {
      id: "INV-1002",
      customer: "Tech Innovators",
      issueDate: "05.02.2025",
      dueDate: "05.02.2025",
      amount: "CHF 12,500.00",
      status: "Paid",
      paymentMethod: "Credit Card",
    },
    {
      id: "INV-1001",
      customer: "DesignWorks",
      issueDate: "10.02.2025",
      dueDate: "10.02.2025",
      amount: "CHF 12,500.00",
      status: "Paid",
      paymentMethod: "Bank Transfer",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Overdue":
        return "text-red-500"
      case "Unpaid":
        return "text-yellow-500"
      case "Paid":
        return "text-green-500"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <button className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-50">
          View All
        </button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Issue date</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment method</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.issueDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell className={getStatusColor(invoice.status)}>{invoice.status}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
