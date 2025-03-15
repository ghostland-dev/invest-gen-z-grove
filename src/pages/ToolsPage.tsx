
import React from 'react';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoanCalculator from '../components/tools/LoanCalculator';
import SavingsCalculator from '../components/tools/SavingsCalculator';

const ToolsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Outils Financiers</h1>
        <p className="text-xl text-gray-600 mb-8">
          Utilisez nos calculateurs financiers pour planifier vos finances personnelles et prendre des décisions éclairées.
        </p>

        <Tabs defaultValue="loan" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="loan">Calculateur de Prêt</TabsTrigger>
            <TabsTrigger value="savings">Calculateur d'Épargne</TabsTrigger>
          </TabsList>
          <TabsContent value="loan">
            <Card>
              <CardHeader>
                <CardTitle>Calculateur de Prêt</CardTitle>
                <CardDescription>
                  Estimez vos mensualités et le coût total de votre prêt en fonction du montant emprunté, du taux d'intérêt et de la durée.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoanCalculator />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="savings">
            <Card>
              <CardHeader>
                <CardTitle>Calculateur d'Épargne</CardTitle>
                <CardDescription>
                  Calculez combien votre épargne peut croître au fil du temps avec des versements réguliers et l'intérêt composé.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SavingsCalculator />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ToolsPage;
