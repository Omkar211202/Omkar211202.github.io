---
title: Management Science
date:
  - 2024-12-24
tags:
  - MBA02
  - MBA
image: /Resources/MBA.jpg
keywords: management science methods, operations research MBA, decision modeling techniques, linear programming management, quantitative analysis tools, simulation optimization, management science applications
---
## Topics Covered:
- LPP, Transportation, Assignment, CPM, PERT, Game Theory.

## Linear Programming Problems:
### Minimization and Maximization problems:
- Each Problem will have an objective function to be minimized or maximized.
- They are subjected to constraints.
- Max/Min=$aX1+bX2$
- subjected to constraints: $\Sigma d_i*X_1+e_i*X_2 <= C_i$

Sensitivity Analysis:
- If Reduced cost for all variables is zero, the solution is in the optimal range.
- If reduced cost is non-zero, a reduction or increase may be required to attain the optimal solution.
- Allowable Increase and decrease in variable cells, will tell us without effecting the optimal solution structure.
- Shadow price is the amount the objective function will increase per unit increase in variable subject to the limits of increase and decrease allowable.
- Shadow pricing is binding if and only if the constraint is fully utilized.
- Increasing non binding constraints will not lead to any increase  in objective function given the existence of slack variables present.

Refer Excel:

![[LPP_Variety_of_sums.xlsx]]

---

## Transportation Problems:

In business, logistics play an important role to satiate demands and supplies across different plants and demand center.

Considering Cost to be a factor to minimize, transportation problems try to match demands and supplies by Production centers and Demand centers.

If total Demand is equal to Total Supply, it will become a balanced problem, else Unbalanced problem.

[Math-behind the technique](https://byjus.com/maths/balanced-and-unbalanced-transportation-problems/)

The aim of the whole problem is to find the qty of materials to be transported from Mine to Plant, such that all the demand and supply constraints are met and the cost of logistics is minimized.

- A Dummy Variable may be required if Demand is more than demand. 
- Remember to keep the coefficients of dummy variable to be the highest, given our task is to minimize the cost.

Refer to  LPP excel.

---

## Assignment Problem:

Assignment problem is a problem or LLP, where we are concerned about assigning personnel or resources to a unit or activity, so as to minimize cost or maximize  profit.

Lets say we have problem to assign 8 trucks to 5 places:

$\Sigma\Sigma C_{ij}X_{ij}$ is set as the objective function, $C_{ij}$ is the cost of assigning $i^{th}$ truck to $j^{th}$ Place and $X_{ij}$ is set to 0 or 1 based on whether we take choice(1) or no (0).

such that:

$\Sigma X_{ij}$ =1 where i kept constant and j varied. (row wise summation is 1)
$\Sigma X_{ij}$ =1 where j kept constant and i varied. (Col summation is 1)

If Assignment problem is unbalanced, use dummy variable to solve. If minimization, maximize the the values of the dummy and vice versa


---


## CPM Method:






---

## PERT Method:








---
## Game Theory:

- This is game that has 2 players: Player 1 and Player 2.
- Player 1 gains the payoff for pay 2. Hence, Player 1 will try to maximize the payoff for any decision made by player 2 and player 2 minimizing the loss for every decision of player 1.

#### Solving a Pure Strategy Game:( refer to the table below)
- Display the matrix.
- Player A has three strategies, A1, A2 and A3.
- Player B has four strategies B1,B2,B3,B4.
- Create Row min column(containing the min of the rows).
- Create Col max column(containing the max of the columns).
- Pick Max of Row min(4) and Min of col max (4), both of them intersect with A2:B3 with the same value of 4.

| Player A (below) | B1  | B2  | B3    | B4  |     | Row Min |
| ---------------- | --- | --- | ----- | --- | --- | ------- |
| A1               | -5  | 3   | 1     | 10  |     | -5      |
| A2               | 5   | 5   | **4** | 6   |     | ==4==   |
| A3               | 4   | -2  | 0     | -5  |     | -5      |
|                  |     |     |       |     |     |         |
| Col Max          | 5   | 5   | ==4== | 10  |     |         |
Saddle Point/Equilibrium point is the place where A & B have attained their strategies. This is also known as Nash Equilibrium.

#### Non-Pure strategy:

| Player A (below) | B1    | B2    | B3    | B4  |     | Row Min |
| ---------------- | ----- | ----- | ----- | --- | --- | ------- |
| A1               | 3     | 2     | 4     | 0   |     | 0       |
| A2               | 3     | 4     | 2     | 4   |     | ==2==   |
| A3               | 4     | 2     | 4     | 0   |     | 0       |
| A4               | 0     | 4     | 0     | 8   |     | 0       |
|                  |       |       |       |     |     |         |
| Col Max          | ==4== | ==4== | ==4== | 8   |     |         |

Apply the same strategies, as mentioned in Pure strategy, we get no saddle points.

Hence, we use Non-Pure(elimination) or Probabilistic strategies.

In this strategy, we must eliminate the row that is dominated by another row, and eliminate the column that is dominating any other column.
Doing, this recursively, we get the Saddle Point.
In case of Dead lock in the process, we employ probability in the process.

(Refer Excel attached below)

#### Mby2 Method & 2byM method:
This is a diagrammatic way of finding those rows and columns that can be eliminated. The only requisite is that the matrix is to be 2 * m matrix or m * 2 matrix.

(Refer Excel attached below)




---

