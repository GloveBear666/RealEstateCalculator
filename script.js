function updateMiscFees() {
    let miscFeesOption = document.getElementById('miscFeesOption');
    let miscFeesAmount = document.getElementById('miscFeesAmount');
    if (miscFeesOption && miscFeesAmount) {
        miscFeesAmount.textContent = miscFeesOption.value;
    }
}

function calculateFIRBFee() {
    let firbFeeRange = document.getElementById('firbFeeRange');
    let contractPriceElement = document.getElementById('contractPrice');
    let firbFeeAmount = document.getElementById('firbFeeAmount');

    if (firbFeeRange && contractPriceElement && firbFeeAmount) {
        let contractPrice = parseFloat(contractPriceElement.value) || 0;
        let fee = 0;

        if (firbFeeRange.value === 'applicable') {
            if (contractPrice < 75000) {
                fee = 4300;
            } else if (contractPrice <= 1000000) {
                fee = 14700;
            } else if (contractPrice <= 2000000) {
                fee = 29500;
            } else if (contractPrice <= 3000000) {
                fee = 59000;
            } else if (contractPrice <= 4000000) {
                fee = 88500;
            } else if (contractPrice <= 5000000) {
                fee = 118000;
            }
        }

        firbFeeAmount.textContent = 'AUD ' + fee.toFixed(2);
        return fee;
    }
    return 0;
}

function calculate() {
    // Get input values
    let contractPriceElement = document.getElementById('contractPrice');
    let downPaymentRateElement = document.getElementById('downPaymentRate');
    let lawyerFee = 1500;  // Fixed lawyer fee
    let stampDutyElement = document.getElementById('stampDuty');
    let loanRateElement = document.getElementById('loanRate');
    let loanTermElement = document.getElementById('loanTerm');
    let piRateElement = document.getElementById('piRate');
    let ioRateElement = document.getElementById('ioRate');
    let rentIncomeElement = document.getElementById('rentIncome');
    let miscFeesOption = document.getElementById('miscFeesOption');
    let waterFeeQuarterElement = document.getElementById('waterFeeQuarter');
    let propertyFeeQuarterElement = document.getElementById('propertyFeeQuarter');
    let cityFeeQuarterElement = document.getElementById('cityFeeQuarter');

    let contractPrice = contractPriceElement ? parseFloat(contractPriceElement.value) || 0 : 0;
    let downPaymentRate = downPaymentRateElement ? parseFloat(downPaymentRateElement.value) || 0 : 0;
    let firbFee = calculateFIRBFee();  // Use calculateFIRBFee to get the FIRB fee
    let stampDuty = stampDutyElement ? parseFloat(stampDutyElement.value) || 0 : 0;
    let loanRate = loanRateElement ? parseFloat(loanRateElement.value) || 0 : 0;
    let loanTerm = loanTermElement ? parseFloat(loanTermElement.value) || 0 : 0;
    let piRate = piRateElement ? parseFloat(piRateElement.value) || 0 : 0;
    let ioRate = ioRateElement ? parseFloat(ioRateElement.value) || 0 : 0;
    let rentIncome = rentIncomeElement ? parseFloat(rentIncomeElement.value) || 0 : 0;
    let miscFees = miscFeesOption ? parseFloat(miscFeesOption.value) || 0 : 0;
    let waterFeeQuarter = waterFeeQuarterElement ? parseFloat(waterFeeQuarterElement.value) || 0 : 0;
    let propertyFeeQuarter = propertyFeeQuarterElement ? parseFloat(propertyFeeQuarterElement.value) || 0 : 0;
    let cityFeeQuarter = cityFeeQuarterElement ? parseFloat(cityFeeQuarterElement.value) || 0 : 0;

    // Calculate values
    let downPayment = contractPrice * downPaymentRate / 100;
    let loanAmount = contractPrice * loanRate / 100;
    let remainingRatio = 1 - (downPaymentRate / 100) - (loanRate / 100);
    let remainingAmount = contractPrice * remainingRatio;
    let stageOneTotal = downPayment + lawyerFee + firbFee;
    let stageTwoTotal = stampDuty + remainingAmount + miscFees;
    let totalCost = stageOneTotal + stageTwoTotal;

    let weeklyPIPayment = (loanAmount * (piRate / 100 / 12)) / (1 - Math.pow(1 + (piRate / 100 / 12), -loanTerm * 12)) / 4;
    let weeklyIOPayment = (loanAmount * (ioRate / 100 / 12)) / 4;
    let annualRentIncome = rentIncome * 52;
    let loanRepaymentQuarter = weeklyPIPayment * 4;
    let loanRepaymentAnnual = loanRepaymentQuarter * 4;
    let totalQuarterlyCost = waterFeeQuarter + propertyFeeQuarter + cityFeeQuarter + loanRepaymentQuarter;
    let totalAnnualCost = totalQuarterlyCost * 4;
    let annualReturnRate = (annualRentIncome / contractPrice) * 100;

    // Update table with calculated values
    if (document.getElementById('downPayment')) document.getElementById('downPayment').textContent = downPayment.toFixed(2);
    if (document.getElementById('loanAmount')) document.getElementById('loanAmount').textContent = loanAmount.toFixed(2);
    if (document.getElementById('remainingRatio')) document.getElementById('remainingRatio').textContent = (remainingRatio * 100).toFixed(2) + '%';
    if (document.getElementById('remainingAmount')) document.getElementById('remainingAmount').textContent = remainingAmount.toFixed(2);
    if (document.getElementById('stageOneTotal')) document.getElementById('stageOneTotal').textContent = stageOneTotal.toFixed(2);
    if (document.getElementById('stageTwoTotal')) document.getElementById('stageTwoTotal').textContent = stageTwoTotal.toFixed(2);
    if (document.getElementById('totalSum')) document.getElementById('totalSum').textContent = totalCost.toFixed(2);
    if (document.getElementById('weeklyPIPayment')) document.getElementById('weeklyPIPayment').textContent = weeklyPIPayment.toFixed(2);
    if (document.getElementById('weeklyIOPayment')) document.getElementById('weeklyIOPayment').textContent = weeklyIOPayment.toFixed(2);
    if (document.getElementById('annualRentIncome')) document.getElementById('annualRentIncome').textContent = annualRentIncome.toFixed(2);
    if (document.getElementById('waterFeeAnnual')) document.getElementById('waterFeeAnnual').textContent = (waterFeeQuarter * 4).toFixed(2);
    if (document.getElementById('propertyFeeAnnual')) document.getElementById('propertyFeeAnnual').textContent = (propertyFeeQuarter * 4).toFixed(2);
    if (document.getElementById('cityFeeAnnual')) document.getElementById('cityFeeAnnual').textContent = (cityFeeQuarter * 4).toFixed(2);
    if (document.getElementById('loanRepaymentQuarter')) document.getElementById('loanRepaymentQuarter').textContent = loanRepaymentQuarter.toFixed(2);
    if (document.getElementById('loanRepaymentAnnual')) document.getElementById('loanRepaymentAnnual').textContent = loanRepaymentAnnual.toFixed(2);
    if (document.getElementById('totalQuarterlyCost')) document.getElementById('totalQuarterlyCost').textContent = totalQuarterlyCost.toFixed(2);
    if (document.getElementById('totalAnnualCost')) document.getElementById('totalAnnualCost').textContent = totalAnnualCost.toFixed(2);
    if (document.getElementById('annualReturnRate')) document.getElementById('annualReturnRate').textContent = annualReturnRate.toFixed(2) + '%';
}

function printPage() {
    window.print();
}

function resetForm() {
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.querySelectorAll('td[id]').forEach(td => td.textContent = '');
    document.getElementById('firbFeeRange').selectedIndex = 0;
    document.getElementById('miscFeesOption').selectedIndex = 0;
}
