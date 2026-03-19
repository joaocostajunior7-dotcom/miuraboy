import { useState, useEffect } from 'react'

interface Transaction {
  id: string
  date: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
}

export default function FinancialControl() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [category, setCategory] = useState('combustível')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const categories = {
    expense: ['combustível', 'manutenção', 'pneu', 'óleo', 'corrente', 'freio', 'bateria', 'outros'],
    income: ['corridas', 'bônus', 'outros']
  }

  useEffect(() => {
    const saved = localStorage.getItem('miuraboy_transactions')
    if (saved) {
      setTransactions(JSON.parse(saved))
    }
  }, [])

  const saveTransaction = () => {
    if (!description || !amount) {
      alert('Preencha todos os campos')
      return
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: selectedDate,
      type,
      category,
      description,
      amount: parseFloat(amount)
    }

    const updated = [...transactions, newTransaction]
    setTransactions(updated)
    localStorage.setItem('miuraboy_transactions', JSON.stringify(updated))

    setDescription('')
    setAmount('')
    setCategory(type === 'expense' ? 'combustível' : 'corridas')
  }

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id)
    setTransactions(updated)
    localStorage.setItem('miuraboy_transactions', JSON.stringify(updated))
  }

  const todayTransactions = transactions.filter(t => t.date === selectedDate)
  const totalIncome = todayTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = todayTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpense

  const monthTransactions = transactions.filter(t => 
    t.date.startsWith(selectedDate.substring(0, 7))
  )
  const monthIncome = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const monthExpense = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Today Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <p className="text-sm opacity-90 mb-2">Saldo do dia</p>
        <h2 className="text-3xl font-bold mb-4">R$ {balance.toFixed(2)}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-75">Entradas</p>
            <p className="text-lg font-semibold">R$ {totalIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Saídas</p>
            <p className="text-lg font-semibold">R$ {totalExpense.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Month Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Mês</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Entradas</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">R$ {monthIncome.toFixed(2)}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Saídas</p>
            <p className="text-lg font-bold text-red-600 dark:text-red-400">R$ {monthExpense.toFixed(2)}</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Saldo</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">R$ {(monthIncome - monthExpense).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Add Transaction */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Registrar movimento</h3>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => { setType('income'); setCategory('corridas') }}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                type === 'income'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              ⬆️ Entrada
            </button>
            <button
              onClick={() => { setType('expense'); setCategory('combustível') }}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                type === 'expense'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              ⬇️ Saída
            </button>
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            {categories[type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Descrição (ex: Gasolina Ipiranga)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Valor (R$)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <button
            onClick={saveTransaction}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Registrar
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Movimentações de hoje</h3>
        
        {todayTransactions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">Nenhuma movimentação registrada</p>
        ) : (
          <div className="space-y-2">
            {todayTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.category}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                  </p>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-xs text-red-500 hover:text-red-700 mt-1"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
