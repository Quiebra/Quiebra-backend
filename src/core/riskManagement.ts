// src/core/riskManagement.ts

export class RiskManagement {
    /**
     * Implements a stop-loss mechanism.
     * @param currentPrice - The current price of the asset.
     * @param purchasePrice - The price at which the asset was bought.
     * @param stopLossPercentage - The percentage loss at which to sell.
     * @returns boolean - True if stop-loss is triggered.
     */
    stopLoss(currentPrice: number, purchasePrice: number, stopLossPercentage: number): boolean {
        const loss = ((purchasePrice - currentPrice) / purchasePrice) * 100;
        if (loss >= stopLossPercentage) {
            console.log(`Stop-loss triggered at ${loss.toFixed(2)}%`);
            return true;
        }
        return false;
    }

    /**
     * Determines the size of the position based on risk tolerance.
     * @param accountBalance - The total balance of the account.
     * @param riskPercentage - The percentage of the account to risk per trade.
     * @returns number - The amount to invest in the trade.
     */
    positionSizing(accountBalance: number, riskPercentage: number): number {
        const positionSize = accountBalance * (riskPercentage / 100);
        console.log(`Position size calculated: ${positionSize}`);
        return positionSize;
    }
}