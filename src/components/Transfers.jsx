import TransactionLog from "./TransactionLog";
import TransferForm from "./TransferForm";

const Transfers = ({ accounts, transactions, onTransfer }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transfers</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage fund transfers between accounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransferForm accounts={accounts} onTransfer={onTransfer} />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transfers</h3>
            <TransactionLog transactions={transactions.slice(0, 10)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfers;