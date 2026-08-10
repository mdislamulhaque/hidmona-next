import MoneyTransferForm from "@/components/money-transfer/MoneyTransferForm";


export default function SendMoneyPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Send Money</h1>
      <MoneyTransferForm />
    </div>
  );
}