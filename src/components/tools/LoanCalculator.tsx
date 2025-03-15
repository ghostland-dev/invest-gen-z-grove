
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank, TrendingUp } from 'lucide-react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  // Calculate loan details
  const calculateLoan = () => {
    const principal = parseFloat(loanAmount.toString());
    const interest = parseFloat(interestRate.toString()) / 100 / 12;
    const payments = parseFloat(loanTerm.toString()) * 12;

    // Calculate monthly payment
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);

    if (isFinite(monthly)) {
      // Update state with calculated values
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * payments);
      setTotalInterest((monthly * payments) - principal);
    }
  };

  // Calculate on mount and when inputs change
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="loanAmount">Montant du prêt (€)</Label>
            <span className="text-sm font-medium">{loanAmount.toLocaleString('fr-FR')} €</span>
          </div>
          <Slider
            id="loanAmount"
            min={1000}
            max={1000000}
            step={1000}
            value={[loanAmount]}
            onValueChange={(value) => setLoanAmount(value[0])}
          />
          <Input
            type="number"
            id="loanAmountInput"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="interestRate">Taux d'intérêt (%)</Label>
            <span className="text-sm font-medium">{interestRate} %</span>
          </div>
          <Slider
            id="interestRate"
            min={0.1}
            max={15}
            step={0.1}
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
          />
          <Input
            type="number"
            id="interestRateInput"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            step="0.1"
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="loanTerm">Durée du prêt (années)</Label>
            <span className="text-sm font-medium">{loanTerm} ans</span>
          </div>
          <Slider
            id="loanTerm"
            min={1}
            max={35}
            step={1}
            value={[loanTerm]}
            onValueChange={(value) => setLoanTerm(value[0])}
          />
          <Input
            type="number"
            id="loanTermInput"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <Button onClick={calculateLoan} className="w-full">
          Calculer
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Résultats</h3>
        
        <Card className="bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <PiggyBank className="h-5 w-5 text-primary" />
              <span className="font-medium">Mensualité</span>
            </div>
            <p className="text-3xl font-bold">{monthlyPayment.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-growth-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-growth-600" />
              <span className="font-medium">Coût total du prêt</span>
            </div>
            <p className="text-2xl font-bold">{totalPayment.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
            <p className="text-sm text-gray-600 mt-2">
              Dont intérêts: {totalInterest.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </p>
          </CardContent>
        </Card>
        
        <div className="p-4 bg-muted rounded-md mt-4">
          <h4 className="font-medium mb-2">Conseils</h4>
          <ul className="text-sm space-y-2">
            <li>• Augmenter votre apport initial réduit le montant emprunté et les intérêts.</li>
            <li>• Comparer les offres de différentes banques peut vous faire économiser des milliers d'euros.</li>
            <li>• Une durée plus courte signifie des mensualités plus élevées mais moins d'intérêts au total.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
