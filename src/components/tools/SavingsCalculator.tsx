
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Calendar, Wallet } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [annualInterestRate, setAnnualInterestRate] = useState(5);
  const [years, setYears] = useState(10);
  const [finalBalance, setFinalBalance] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);
  const [growthData, setGrowthData] = useState<any[]>([]);

  // Calculate savings growth
  const calculateSavings = () => {
    let balance = initialDeposit;
    const monthlyRate = annualInterestRate / 100 / 12;
    const totalMonths = years * 12;
    const chartData = [];
    
    // Track year-by-year growth for the chart
    for (let year = 0; year <= years; year++) {
      const currentMonths = year * 12;
      
      if (year === 0) {
        chartData.push({
          year: 0,
          balance: initialDeposit
        });
        continue;
      }
      
      // Calculate balance for this year
      let yearBalance = initialDeposit;
      for (let month = 1; month <= currentMonths; month++) {
        yearBalance = (yearBalance + monthlyContribution) * (1 + monthlyRate);
      }
      
      chartData.push({
        year,
        balance: Math.round(yearBalance)
      });
    }

    // Calculate final values
    const finalMonthlyBalance = balance;
    for (let i = 1; i <= totalMonths; i++) {
      balance = (balance + monthlyContribution) * (1 + monthlyRate);
    }
    
    const totalDeposits = initialDeposit + (monthlyContribution * totalMonths);
    
    setFinalBalance(balance);
    setTotalContributions(totalDeposits);
    setInterestEarned(balance - totalDeposits);
    setGrowthData(chartData);
  };

  // Calculate on mount and when inputs change
  useEffect(() => {
    calculateSavings();
  }, [initialDeposit, monthlyContribution, annualInterestRate, years]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="initialDeposit">Dépôt initial (€)</Label>
            <span className="text-sm font-medium">{initialDeposit.toLocaleString('fr-FR')} €</span>
          </div>
          <Slider
            id="initialDeposit"
            min={0}
            max={50000}
            step={100}
            value={[initialDeposit]}
            onValueChange={(value) => setInitialDeposit(value[0])}
          />
          <Input
            type="number"
            id="initialDepositInput"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="monthlyContribution">Versement mensuel (€)</Label>
            <span className="text-sm font-medium">{monthlyContribution.toLocaleString('fr-FR')} €</span>
          </div>
          <Slider
            id="monthlyContribution"
            min={0}
            max={2000}
            step={10}
            value={[monthlyContribution]}
            onValueChange={(value) => setMonthlyContribution(value[0])}
          />
          <Input
            type="number"
            id="monthlyContributionInput"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="annualInterestRate">Taux d'intérêt annuel (%)</Label>
            <span className="text-sm font-medium">{annualInterestRate} %</span>
          </div>
          <Slider
            id="annualInterestRate"
            min={0.1}
            max={15}
            step={0.1}
            value={[annualInterestRate]}
            onValueChange={(value) => setAnnualInterestRate(value[0])}
          />
          <Input
            type="number"
            id="annualInterestRateInput"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
            step="0.1"
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="years">Durée (années)</Label>
            <span className="text-sm font-medium">{years} ans</span>
          </div>
          <Slider
            id="years"
            min={1}
            max={40}
            step={1}
            value={[years]}
            onValueChange={(value) => setYears(value[0])}
          />
          <Input
            type="number"
            id="yearsInput"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-2"
          />
        </div>

        <Button onClick={calculateSavings} className="w-full">
          Calculer
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Résultats</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">Balance finale</span>
              </div>
              <p className="text-lg font-bold">{finalBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-muted">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">Contributions</span>
              </div>
              <p className="text-lg font-bold">{totalContributions.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-growth-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart className="h-4 w-4 text-growth-600" />
                <span className="font-medium text-sm">Intérêts gagnés</span>
              </div>
              <p className="text-lg font-bold">{interestEarned.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6 h-72 bg-white rounded-md">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={growthData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="year" 
                label={{ value: 'Années', position: 'insideBottom', offset: -15 }} 
              />
              <YAxis 
                tickFormatter={(value) => `${(value / 1000)}k €`}
                label={{ value: 'Euros', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value) => `${value.toLocaleString('fr-FR')} €`}
                labelFormatter={(value) => `Année ${value}`}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#10b981" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Balance"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="p-4 bg-muted rounded-md mt-4">
          <h4 className="font-medium mb-2">Conseils d'Épargne</h4>
          <ul className="text-sm space-y-2">
            <li>• Commencez tôt : le temps est votre meilleur allié grâce à l'intérêt composé.</li>
            <li>• Augmentez progressivement vos versements mensuels au fil du temps.</li>
            <li>• Diversifiez vos investissements pour optimiser le rendement et réduire les risques.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;
