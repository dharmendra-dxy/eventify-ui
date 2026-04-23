import React, { useState } from 'react';
import {
    Banknote,
    TrendingUp,
    TrendingDown,
    Wallet,
    Plus,
    FileText,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Calculator,
    Upload,
    PieChart as PieChartIcon
} from 'lucide-react';
import { NeoCard } from '@/components/ui/NeoCard';
import { NeoButton } from '@/components/ui/NeoButton';
import { NeoBadge } from '@/components/ui/NeoBadge';
import { NeoInput } from '@/components/ui/NeoInput';
import { NeoSelect } from '@/components/ui/NeoSelect';
import { NeoModal } from '@/components/ui/NeoModal';
import { SimpleLineChart } from '@/components/charts/SimpleLineChart';
import { ExportButton } from '@/components/ExportButton';
import { formatCurrency } from '@/lib/data';
import { cn } from '@/lib/utils';

// Mock Data
const initialRevenue = [
    { id: 1, source: 'Early Bird Tickets', category: 'Tickets', amount: 45000, method: 'Stripe', date: '2024-03-01', proof: 'receipt_01.pdf', notes: 'Main ticket sales' },
    { id: 2, source: 'Tech Sponsor Alpha', category: 'Sponsorship', amount: 20000, method: 'Bank Transfer', date: '2024-03-05', proof: 'invoice_alpha.pdf', notes: 'Platinum sponsor' },
    { id: 3, source: 'Food Stall - Pizza', category: 'Stall', amount: 7500, method: 'UPI', date: '2024-03-10', proof: 'upi_ref_123.jpg', notes: 'Stall rental fee' },
];

const initialExpenses = [
    { id: 1, name: 'Main Hall Booking', category: 'Venue', amount: 25000, paidTo: 'Convention Center', method: 'Bank Transfer', date: '2024-02-15', unexpected: false, attachment: 'venue_contract.pdf', notes: 'Advance payment' },
    { id: 2, name: 'Social Media Ads', category: 'Marketing', amount: 8000, paidTo: 'Meta Ads', method: 'Credit Card', date: '2024-03-02', unexpected: false, attachment: 'ad_receipt.png', notes: 'Tier 1 campaign' },
    { id: 3, name: 'Extra Sound Gear', category: 'Equipment', amount: 5000, paidTo: 'Audio Solutions', method: 'Cash', date: '2024-03-12', unexpected: true, attachment: 'cash_memo.jpg', notes: 'Requirement changed' },
    { id: 4, name: 'Staff Lunch', category: 'Staff', amount: 3200, paidTo: 'Catering Co', method: 'UPI', date: '2024-03-14', unexpected: false, attachment: 'bill_045.jpg', notes: 'Pre-event briefing' },
];

const initialBudget = [
    { category: 'Venue', planned: 30000, actual: 25000 },
    { category: 'Catering', planned: 5000, actual: 3200 },
    { category: 'Marketing', planned: 7000, actual: 8000 },
    { category: 'Staff', planned: 4000, actual: 3200 },
    { category: 'Equipment', planned: 4000, actual: 5000 },
];

const chartData = [
    { label: 'Jan', revenue: 20000, expenses: 15000 },
    { label: 'Feb', revenue: 35000, expenses: 20000 },
    { label: 'Mar', revenue: 55000, expenses: 32000 },
    { label: 'Apr', revenue: 72500, expenses: 41200 },
];

export const Finance: React.FC = () => {
    const [revenue, setRevenue] = useState(initialRevenue);
    const [expenses, setExpenses] = useState(initialExpenses);
    const [budget] = useState(initialBudget);

    const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

    // Summary Totals
    const totalRevenue = revenue.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const totalPlannedBudget = budget.reduce((sum, item) => sum + item.planned, 0);
    const budgetRemaining = totalPlannedBudget - totalExpenses;

    // Break-even Analysis State
    const [ticketPrice, setTicketPrice] = useState(500);
    const breakEvenTickets = Math.ceil(totalExpenses / ticketPrice);

    const handleAddRevenue = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newEntry = {
            id: revenue.length + 1,
            source: formData.get('source') as string,
            category: formData.get('category') as string,
            amount: Number(formData.get('amount')),
            method: formData.get('method') as string,
            date: formData.get('date') as string,
            proof: 'uploaded_file.pdf',
            notes: formData.get('notes') as string,
        };
        setRevenue([...revenue, newEntry]);
        setIsRevenueModalOpen(false);
    };

    const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newEntry = {
            id: expenses.length + 1,
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            amount: Number(formData.get('amount')),
            paidTo: formData.get('paidTo') as string,
            method: formData.get('method') as string,
            date: formData.get('date') as string,
            unexpected: formData.get('unexpected') === 'on',
            attachment: 'uploaded_bill.pdf',
            notes: formData.get('notes') as string,
        };
        setExpenses([...expenses, newEntry]);
        setIsExpenseModalOpen(false);
    };
    return (
        <div className="neo-page p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-2">
                        Finance Dashboard
                    </h1>
                    <p className="text-lg font-medium text-black/60">
                        Track revenue, manage expenses, and monitor budget health.
                    </p>
                </div>
                <ExportButton
                    filename="financial_report"
                    title="Event Financial Report"
                    data={[
                        ...revenue.map(r => ({ type: 'REVENUE', ...r })),
                        ...expenses.map(e => ({ type: 'EXPENSE', ...e })),
                        ...budget.map(b => ({ type: 'BUDGET', ...b }))
                    ]}
                    className="w-fit"
                />
            </div>

            {/* 1. Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <SummaryCard
                    title="Total Revenue"
                    value={formatCurrency(totalRevenue)}
                    icon={TrendingUp}
                    trend="+12%"
                    color="bg-[#22C55E]"
                    variant="outline"
                    trendColor="bg-[#22C55E]"
                />
                <SummaryCard
                    title="Total Expenses"
                    value={formatCurrency(totalExpenses)}
                    icon={TrendingDown}
                    trend="+5%"
                    color="bg-[#FF6B6B]"
                    variant="primary"
                    trendColor="bg-[#FF6B6B]"
                />
                <SummaryCard
                    title="Net Profit"
                    value={formatCurrency(netProfit)}
                    icon={Banknote}
                    trend="+18%"
                    color="bg-[#FFD93D]"
                    variant="secondary"
                    trendColor="bg-[#FFD93D]"
                />
                <SummaryCard
                    title="Budget Remaining"
                    value={formatCurrency(budgetRemaining)}
                    icon={Wallet}
                    trend="-2%"
                    color="bg-[#C4B5FD]"
                    variant="muted"
                    trendColor="bg-[#C4B5FD]"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-8 space-y-8">

                    {/* 2. Revenue Section */}
                    <NeoCard>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-[#22C55E]" />
                                Revenue Sources
                            </h2>
                            <NeoButton onClick={() => setIsRevenueModalOpen(true)} size="sm">
                                <Plus className="w-4 h-4 mr-1" />
                                Add Revenue
                            </NeoButton>
                        </div>
                        <div className="overflow-x-auto border-4 border-black">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#FFFDF5] border-b-4 border-black">
                                    <tr>
                                        <th className="p-4 font-black uppercase text-sm">Source</th>
                                        <th className="p-4 font-black uppercase text-sm">Category</th>
                                        <th className="p-4 font-black uppercase text-sm">Amount</th>
                                        <th className="p-4 font-black uppercase text-sm">Method</th>
                                        <th className="p-4 font-black uppercase text-sm">Date</th>
                                        <th className="p-4 font-black uppercase text-sm">Proof</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {revenue.map((item) => (
                                        <tr key={item.id} className="border-b-4 border-black hover:bg-black/5 transition-colors">
                                            <td className="p-4 font-bold">{item.source}</td>
                                            <td className="p-4">
                                                <NeoBadge variant="muted" className="text-[10px]">{item.category}</NeoBadge>
                                            </td>
                                            <td className="p-4 font-black">{formatCurrency(item.amount)}</td>
                                            <td className="p-4 text-sm">{item.method}</td>
                                            <td className="p-4 text-sm font-bold uppercase">{item.date}</td>
                                            <td className="p-4">
                                                <button className="p-2 bg-[#FFD93D] border-2 border-black shadow-[2px_2px_0px_#000] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]" aria-label="View Proof">
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </NeoCard>

                    {/* 3. Expense Section */}
                    <NeoCard rotation={-0.5}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                                <TrendingDown className="w-6 h-6 text-[#FF6B6B]" />
                                Expense Tracker
                            </h2>
                            <NeoButton onClick={() => setIsExpenseModalOpen(true)} variant="secondary" size="sm">
                                <Plus className="w-4 h-4 mr-1" />
                                Add Expense
                            </NeoButton>
                        </div>
                        <div className="overflow-x-auto border-4 border-black">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#FFFDF5] border-b-4 border-black">
                                    <tr>
                                        <th className="p-4 font-black uppercase text-sm">Expense</th>
                                        <th className="p-4 font-black uppercase text-sm">Category</th>
                                        <th className="p-4 font-black uppercase text-sm">Amount</th>
                                        <th className="p-4 font-black uppercase text-sm">Paid To</th>
                                        <th className="p-4 font-black uppercase text-sm">Date</th>
                                        <th className="p-4 font-black uppercase text-sm">Unexpected</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses.map((item) => (
                                        <tr key={item.id} className="border-b-4 border-black hover:bg-black/5 transition-colors">
                                            <td className="p-4 font-bold">{item.name}</td>
                                            <td className="p-4">
                                                <NeoBadge variant="primary" className="text-[10px]">{item.category}</NeoBadge>
                                            </td>
                                            <td className="p-4 font-black">{formatCurrency(item.amount)}</td>
                                            <td className="p-4 text-sm">{item.paidTo}</td>
                                            <td className="p-4 text-sm font-bold uppercase">{item.date}</td>
                                            <td className="p-4">
                                                {item.unexpected && (
                                                    <div className="w-10 h-10 bg-red-500 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                                                        <AlertCircle className="w-6 h-6 text-white" />
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </NeoCard>

                    {/* 5. Profit Analytics Chart */}
                    <NeoCard rotation={0.5}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                                <PieChartIcon className="w-6 h-6" />
                                Financial Overview
                            </h2>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-[#22C55E] border-2 border-black" />
                                    <span className="text-xs font-black uppercase">Revenue</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-[#FF6B6B] border-2 border-black" />
                                    <span className="text-xs font-black uppercase">Expenses</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[300px] w-full bg-[#FFFDF5] border-4 border-black p-4 relative overflow-hidden">
                            <SimpleLineChart
                                data={chartData.map(d => ({ label: d.label, value: d.revenue }))}
                                color="#22C55E"
                                height={260}
                            />
                            <div className="absolute inset-0 p-4 pt-4 pointer-events-none">
                                <SimpleLineChart
                                    data={chartData.map(d => ({ label: d.label, value: d.expenses }))}
                                    color="#FF6B6B"
                                    height={260}
                                    className="[&>div:last-child]:invisible"
                                />
                            </div>
                        </div>
                    </NeoCard>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 space-y-8">

                    {/* 4. Budget Planning */}
                    <NeoCard>
                        <div className="flex flex-col gap-4 mb-6">
                            <h2 className="text-xl font-black uppercase flex items-center gap-2">
                                <Wallet className="w-5 h-5 text-[#C4B5FD]" />
                                Budget Planner
                            </h2>
                        </div>
                        <div className="space-y-6">
                            {budget.map((item, idx) => {
                                const percentage = Math.min((item.actual / item.planned) * 100, 100);
                                const isOver = item.actual > item.planned;
                                return (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="font-black text-sm uppercase tracking-tight">{item.category}</span>
                                            <span className="text-[10px] font-black uppercase">
                                                {formatCurrency(item.actual)} / {formatCurrency(item.planned)}
                                            </span>
                                        </div>
                                        <div className="h-8 w-full bg-white border-4 border-black shadow-[4px_4px_0px_#000] rotate-[0.5deg]">
                                            <div
                                                className={cn(
                                                    "h-full border-r-4 border-black transition-all duration-700",
                                                    isOver ? "bg-[#FF6B6B]" : "bg-[#FFD93D]"
                                                )}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[10px] font-black uppercase text-black/40">
                                                {formatCurrency(Math.max(0, item.planned - item.actual))} Left
                                            </span>
                                            {isOver && (
                                                <p className="text-[10px] text-red-600 font-black uppercase flex items-center gap-1 animate-pulse">
                                                    <AlertCircle className="w-3 h-3" />
                                                    Budget Exceeded
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            <NeoButton
                                onClick={() => setIsBudgetModalOpen(true)}
                                variant="muted"
                                size="sm"
                                className="w-full mt-4"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Category
                            </NeoButton>
                        </div>
                    </NeoCard>

                    {/* 6. Break-even Analysis */}
                    <NeoCard rotation={1}>
                        <h2 className="text-xl font-black uppercase flex items-center gap-2 mb-4">
                            <Calculator className="w-5 h-5" />
                            Break-even Analysis
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black uppercase text-black/60 block mb-1">Total Expenses (₹)</label>
                                <div className="p-3 bg-gray-50 border-4 border-black font-black text-xl">
                                    {formatCurrency(totalExpenses)}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-black uppercase text-black/60 block mb-1">Avg Ticket Price (₹)</label>
                                <NeoInput
                                    type="number"
                                    value={ticketPrice}
                                    onChange={(e) => setTicketPrice(Number(e.target.value))}
                                    className="font-black text-xl"
                                />
                            </div>
                            <div className="bg-[#FF6B6B] border-4 border-black p-5 shadow-[10px_10px_0px_#000] -rotate-2 mt-6">
                                <p className="text-xs font-black uppercase mb-1">Goal: Break-even</p>
                                <p className="text-4xl font-black tracking-tighter">{breakEvenTickets}</p>
                                <p className="text-[10px] font-black uppercase mt-1 leading-none">Tickets needed to cover all costs</p>
                            </div>
                        </div>
                    </NeoCard>

                    {/* Quick Action Decor */}
                    <div className="bg-[#FFD93D] border-4 border-black p-6 shadow-[8px_8px_0px_#000] rotate-1">
                        <h3 className="text-lg font-black uppercase mb-2">Revenue Growth</h3>
                        <p className="text-sm font-medium">
                            Sponsorships currently contribute <span className="font-black">27%</span> of your total revenue. Aim for 40% for better stability.
                        </p>
                    </div>
                </div>
            </div>

            {/* REVENUE MODAL */}
            <NeoModal
                isOpen={isRevenueModalOpen}
                onClose={() => setIsRevenueModalOpen(false)}
                title="Add Revenue Entry"
                size="md"
            >
                <form onSubmit={handleAddRevenue} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Source Name</label>
                            <NeoInput name="source" placeholder="e.g. Stripe Sales" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Category</label>
                            <NeoSelect
                                name="category"
                                required
                                options={[
                                    { value: 'Tickets', label: 'Tickets' },
                                    { value: 'Sponsorship', label: 'Sponsorship' },
                                    { value: 'Stall', label: 'Stall' },
                                    { value: 'Merchandise', label: 'Merchandise' },
                                    { value: 'Other', label: 'Other' }
                                ]}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Amount (₹)</label>
                            <NeoInput name="amount" type="number" placeholder="0.00" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Payment Method</label>
                            <NeoSelect
                                name="method"
                                required
                                options={[
                                    { value: 'Stripe', label: 'Stripe' },
                                    { value: 'Bank Transfer', label: 'Bank Transfer' },
                                    { value: 'UPI', label: 'UPI' },
                                    { value: 'Cash', label: 'Cash' },
                                    { value: 'Credit Card', label: 'Credit Card' }
                                ]}
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase">Received From</label>
                        <NeoInput name="receivedFrom" placeholder="Name of organization/person" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Date</label>
                            <NeoInput name="date" type="date" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Upload Proof</label>
                            <div className="border-4 border-dashed border-black p-2 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                                <Upload className="w-5 h-5 mr-2" />
                                <span className="text-[10px] font-black uppercase">Browse Files</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase">Notes</label>
                        <NeoInput name="notes" placeholder="Optional details..." />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <NeoButton type="button" variant="muted" onClick={() => setIsRevenueModalOpen(false)}>Cancel</NeoButton>
                        <NeoButton type="submit">Add Revenue</NeoButton>
                    </div>
                </form>
            </NeoModal>

            {/* EXPENSE MODAL */}
            <NeoModal
                isOpen={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
                title="Track New Expense"
                size="md"
            >
                <form onSubmit={handleAddExpense} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Expense Name</label>
                            <NeoInput name="name" placeholder="e.g. Catering Deposit" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Category</label>
                            <NeoSelect
                                name="category"
                                required
                                options={[
                                    { value: 'Venue', label: 'Venue' },
                                    { value: 'Catering', label: 'Catering' },
                                    { value: 'Printing', label: 'Printing' },
                                    { value: 'Marketing', label: 'Marketing' },
                                    { value: 'Staff', label: 'Staff' },
                                    { value: 'Equipment', label: 'Equipment' },
                                    { value: 'Other', label: 'Other' }
                                ]}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Amount (₹)</label>
                            <NeoInput name="amount" type="number" placeholder="0.00" required />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Paid To</label>
                            <NeoInput name="paidTo" placeholder="Recipient" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Payment Method</label>
                            <NeoSelect
                                name="method"
                                required
                                options={[
                                    { value: 'Bank Transfer', label: 'Bank Transfer' },
                                    { value: 'UPI', label: 'UPI' },
                                    { value: 'Cash', label: 'Cash' },
                                    { value: 'Credit Card', label: 'Credit Card' },
                                    { value: 'Cheque', label: 'Cheque' }
                                ]}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase">Date</label>
                            <NeoInput name="date" type="date" required />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 border-4 border-black">
                        <input type="checkbox" name="unexpected" id="unexpected" className="w-5 h-5 border-4 border-black accent-[#FF6B6B]" />
                        <label htmlFor="unexpected" className="text-sm font-black uppercase cursor-pointer">Unexpected Expense</label>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase">Notes</label>
                        <NeoInput name="notes" placeholder="Why was this spent?" />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <NeoButton type="button" variant="muted" onClick={() => setIsExpenseModalOpen(false)}>Cancel</NeoButton>
                        <NeoButton type="submit" variant="secondary">Save Expense</NeoButton>
                    </div>
                </form>
            </NeoModal>

            {/* BUDGET MODAL */}
            <NeoModal
                isOpen={isBudgetModalOpen}
                onClose={() => setIsBudgetModalOpen(false)}
                title="New Budget Category"
                size="sm"
            >
                <form className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase">Category Name</label>
                        <NeoInput placeholder="e.g. Travel" required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-black uppercase">Planned Budget (₹)</label>
                        <NeoInput type="number" placeholder="0.00" required />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <NeoButton type="button" variant="muted" onClick={() => setIsBudgetModalOpen(false)}>Cancel</NeoButton>
                        <NeoButton type="button" variant="primary" onClick={() => setIsBudgetModalOpen(false)}>Add Category</NeoButton>
                    </div>
                </form>
            </NeoModal>
        </div >
    );
};

interface SummaryCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    trend: string;
    color: string;
    variant: 'primary' | 'secondary' | 'muted' | 'danger' | 'outline';
    trendColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon: Icon, trend, color, variant, trendColor }) => {
    return (
        <NeoCard className="p-0 overflow-hidden group">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className={cn("w-14 h-14 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] rotate-2 group-hover:rotate-0 transition-transform", color)}>
                        <Icon className="w-7 h-7" />
                    </div>
                    <NeoBadge
                        variant={variant === 'outline' ? 'outline' : (variant === 'danger' ? 'primary' : variant)}
                        rotation={-3}
                        className={cn("px-2 py-1", trendColor)}
                    >
                        {variant === 'primary' || variant === 'outline' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {trend}
                    </NeoBadge>
                </div>
                <h3 className="text-sm font-black uppercase text-black/60 mb-1">{title}</h3>
                <p className="text-2xl sm:text-3xl font-black truncate">{value}</p>
            </div>
            <div className={cn("h-4 border-t-4 border-black", color)} />
        </NeoCard>
    );
};