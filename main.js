const searchInput = document.querySelector("#searchInput")
const outputElement = document.querySelector("#app")

const totalProfit = (firstName, lastName) => {
    const totalSalesArray = salesByWeek.filter(a => (a.sales_agent.first_name === firstName) && (a.sales_agent.last_name === lastName))
    const totalProfit = totalSalesArray.reduce((total, currentItem) => total += currentItem.gross_profit, 0)
    return totalProfit
}

const buildHTML = (sale) => {
    outputElement.innerHTML += `
    <hr/>
    <h1>${sale.sales_agent.first_name} ${sale.sales_agent.last_name}</h1>
    <p>Email: ${sale.sales_agent.email}</p>
    <p>Total Profit: $${totalProfit(sale.sales_agent.first_name, sale.sales_agent.last_name)}</p>
    `
}

searchInput.addEventListener('keypress', event => {
  if (event.charCode === 13) {
    outputElement.innerHTML = ""
    const searchTerm = event.target.value
    event.target.value = ""
    salesByWeek.forEach(sale => {
        Object.entries(sale.sales_agent).forEach(item => {
            if ((item[1].toLowerCase().includes(searchTerm.toLowerCase())) && (searchTerm.replace(/\s/g, '') != "")) {
                buildHTML(sale)
                }
        })
    })
  }
})