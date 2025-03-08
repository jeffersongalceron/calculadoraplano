document.addEventListener('DOMContentLoaded', () => {
    const basePriceInput = document.getElementById('basePrice');
    const discountThresholdInput = document.getElementById('discountThreshold');
    const discountRateInput = document.getElementById('discountRate');
    const affiliateCommissionRateInput = document.getElementById('affiliateCommissionRate');
    const ambassadorCommissionRateInput = document.getElementById('ambassadorCommissionRate');
    const spaceInput = document.getElementById('spaces');
    const spaceValue = document.getElementById('space-value');
    const resultDisplay = document.getElementById('total-price');
    const resultDisplayDiscounted = document.getElementById('total-price-discounted');
    const affiliateCommissionDisplay = document.getElementById('affiliate-commission');
    const ambassadorCommissionDisplay = document.getElementById('ambassador-commission');

    function updateValues() {
        const basePrice = parseFloat(basePriceInput.value);
        const discountThreshold = parseInt(discountThresholdInput.value);
        const discountRate = parseFloat(discountRateInput.value) / 100;
        const affiliateCommissionRate = parseFloat(affiliateCommissionRateInput.value) / 100;
        const ambassadorCommissionRate = parseFloat(ambassadorCommissionRateInput.value) / 100;
        const numberOfSpaces = parseInt(spaceInput.value);

        if (isNaN(numberOfSpaces) || numberOfSpaces < 1) {
            resultDisplay.textContent = 'Por favor, insira um número válido de espaços.';
            return;
        }

        const { totalCost, totalCostWithoutDiscount, discountPercentage, affiliateCommission, ambassadorCommission } = calculateSubscriptionCost(basePrice, discountThreshold, discountRate, affiliateCommissionRate, ambassadorCommissionRate, numberOfSpaces);
        resultDisplay.textContent = `Preço Total: R$ ${totalCostWithoutDiscount.toFixed(2)}`;
        if (numberOfSpaces >= discountThreshold) {
            resultDisplayDiscounted.innerHTML = `
                Preço Total com Desconto: R$ ${totalCost.toFixed(2)}<br>
                Desconto: ${discountPercentage.toFixed(2)}%
            `;
        } else {
            resultDisplayDiscounted.innerHTML = `Preço Total com Desconto: R$ ${totalCost.toFixed(2)}`;
        }
        affiliateCommissionDisplay.textContent = `Comissão do Afiliado: R$ ${affiliateCommission.toFixed(2)}`;
        ambassadorCommissionDisplay.textContent = `Comissão do Embaixador: R$ ${ambassadorCommission.toFixed(2)}`;
    }

    spaceInput.addEventListener('input', () => {
        spaceValue.textContent = spaceInput.value;
        updateValues();
    });

    basePriceInput.addEventListener('input', updateValues);
    discountThresholdInput.addEventListener('input', updateValues);
    discountRateInput.addEventListener('input', updateValues);
    affiliateCommissionRateInput.addEventListener('input', updateValues);
    ambassadorCommissionRateInput.addEventListener('input', updateValues);

    // Initialize with default values
    updateValues();
});

function calculateSubscriptionCost(basePrice, discountThreshold, discountRate, affiliateCommissionRate, ambassadorCommissionRate, spaces) {
    let totalCostWithoutDiscount = basePrice * spaces;
    let totalCost = totalCostWithoutDiscount;
    let discount = 0;

    // Apply discount for every discountThreshold spaces
    if (spaces >= discountThreshold) {
        discount = Math.floor(spaces / discountThreshold) * basePrice * discountRate * discountThreshold;
    }

    totalCost -= discount;
    const discountPercentage = (discount / totalCostWithoutDiscount) * 100;
    const affiliateCommission = totalCost * affiliateCommissionRate;
    const ambassadorCommission = totalCost * ambassadorCommissionRate;
    return { totalCost, totalCostWithoutDiscount, discountPercentage, affiliateCommission, ambassadorCommission };
}