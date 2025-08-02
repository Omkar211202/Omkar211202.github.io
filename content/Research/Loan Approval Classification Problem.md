---
title: Loan Approval Classification Problem
date:
  - 2025-04-07
tags:
  - Research
  - Techie
draft: "false"
image: /Resources/Research.jpg
keywords: loan approval classification, credit risk ML model, supervised learning credit scoring, logistic regression loan approval, credit dataset analysis, machine learning finance case study
---
### Abstract:
The problem we want to solve is to analyze the relationships between all the variables with respect to a customer, and see if its beneficial for the bank to give him a loan or not.
To do this, we need to use a classification problem to either give him a loan or not.
This is primarily dealing with the loan due-diligence.

### Deliverables:
- Create charts to show the relationship between variables.
- Create charts to show how each variables effect the target variable, i.e. Loan status.
- To build models to  predict whether an individual will get a loan or not from the bank.

### Power_BI Dashboard & Codes:

![[final.pbix]]

![[Classification_Models 1.r]]

![[PreProcessing.r]]

### Data Acquisition:
- Data: [Loan-Approval-Prediction-Dataset](https://www.kaggle.com/datasets/architsharma01/loan-approval-prediction-dataset)
- Obtained from Kaggle, a MIT Licensed data.
- The following data has: 13 columns and 4269 rows.
- The following is the brief about the columns in the dataset

```text
 [1] "loan_id" : Identification number of the Loan            
 [2] "no_of_dependents" : Number of Dependents of the Applicant
 [3] "education" : Education of the Applicant             
 [4] "self_employed" : Employment Status of the Applicant          
 [5] "income_annum" : Annual Income of the Applicant          
 [6] "loan_amount" :  Loan Amount           
 [7] "loan_term" : Loan Term in Years             
 [8] "cibil_score" : Credit Score           
 [9] "residential_assets_value" : The value of residential assets of the applicant
[10] "commercial_assets_value" : value of the commercial assets of the applicant
[11] "luxury_assets_value" : other luxury assets owned by the applicant
[12] "bank_asset_value" : amount of assets the applicant has with the bank.   
[13] "loan_status" : states whether the loan was approved or rejected.
```

### Data Preparation & Exploration:
- Required Libraries for the programming:
```r
install.packages("reshape2")  # used for building heatmaps structure
install.packages('stringi')
install.packages("caTools")   # used for machine learning metrics
install.packages("rpart.plot") # to build the tree diagram of the model process



library(dplyr)
library(data.table)
library(tidyr)
library(ggplot2)
```

- Importing the dataset:
```r
data=read.csv("C:\\Users\\omkar\\Desktop\\MBA\\Busi_Analytics\\Master_Project\\loan_approval_dataset.csv")
```

- Handling missing values:
```r
colSums(is.na(data)) # checks whether there are missing values columnwise
sum(is.na(data))     # sum of all the missing values in the dataset
sum(duplicated(data)) # sees if there are any duplicated rows in the dataset.
```

- Since there are no missing values in the dataset, or the dataset is clean, hence, there is no requirement for removal or imputation.

### Exploratory Data Analysis:

- starting with basic summary:
```r
dim(data)   # 4269   13 rows*columns
str(data)   # all columns are integers except education, self_employed and loan status, which are characters
colnames(data)
head(data)
summary(data)
```

- Further Analysis: The step in the data processing is to see how one variable affects the other and how they individually effect the to be target variable: loan status.
- Seeing how character variables effect the target variable:

```r
# using the dplyr library, we can filter, group and play with the data.
education1<-data%>%
  group_by(education)%>%
  count(education)%>%
  rename(count=n)%>%
  mutate(percentage=paste0(round(count/nrow(data)*100,2),"%"))

# creating a pi chart to analyse percentage of both grads and non grads in the data set
ggplot(data = education1, mapping = aes(x = "", y = count, fill = education))+
  geom_bar(stat = "identity") +
  coord_polar(theta = "y", start = 0) +
  labs(x = NULL, y = NULL)+
  theme_void() +
  geom_text(aes(label = percentage),position = position_stack(vjust = 0.5)) +
  labs(title = "Percentage of Graduates to Non graduates")



```


![[Cp.png]]

- seeing how education effects the status of approval or not:
```r
data%>%
  group_by(education,loan_status)%>%
  summarise(count=n())%>%
  ggplot(aes(x=education,y=count,fill=loan_status))+
  geom_bar(stat="identity",position="dodge")+
  labs(title = "Loan Approval By educational Status",x="Education Status",
       y="Count",fill="Loan Status")+theme_minimal()


```

![[cp2.png]]

- Similar chart seeing the relationship between character variables and the target can be drawn from the data [^1]

- Seeing how integer variables determine the target variable:

```r
ggplot(data,mapping=aes(x=loan_status,y=cibil_score))+
  geom_boxplot()+labs(title="Credit score distribution between loan status")
```

![[BB6.png]]

- A similar Analysis can be seen with other integer variables and how they effect.[^2]

- The next part of the problem is to see how the numeric values are related to each other.
- This is to be done using correlation heatmaps.

```r
cor_loan<-cor(num_loan)
cor_loan
melted_loan<- reshape2::melt(cor_loan)
head(melted_loan)

ggplot(data=melted_loan,aes(Var1,Var2,fill=value))+
  geom_tile()+
  theme(axis.text.x=element_text(angle=90))+
  geom_text(aes(label=round(value,2)))+
  scale_fill_gradient(low="yellow",high='red')

```

![[heatmap.png]]

#### Observation from the Correlation heatmap:
- Positive Relationships(strong)
1. Bank asset value with income and loan amount, they want.
2. Luxury assets with income and loan amount, they want.
3. Commercial assets value with income and loan amount, they want.
4. residential assets value income and loan amount, they want.

Finally we can conclude that people with higher income will have large bank assets, luxury assets, commercial assets and residential assets, they also seek higher loan amounts.


> [!NOTE] Observations from Data Preprocessing
> The only factor that impacts approval or dismissal heavily is Credit score.
> Longer Tenure loans are more likely to be rejected.
> Heavy income leads to large bank assets, luxury assets, commercial assets and residential assets.
> These people are the one who are more  likely seeking higher loans.

---

### Classification Models:

- Data Processing for Classification:
```r
set.seed(123)
trainIndex <- createDataPartition(data$loan_status, p = .8, 
                                  list = FALSE, 
                                  times = 1)
train <- data[trainIndex, ]
test  <- data[-trainIndex, ]
```

#### Using GLM (Logistic Regression)
Since the target variable is binomial in nature, we can use the logistic regression with hyper-parameter tuning.

```r
# Set up cross-validation
train_control <- trainControl(method = "cv", number = 15)

names(data)

# Train GLM model
glm_model <- train(loan_status ~ cibil_score+loan_term , 
                   data = train, 
                   method = "glm", 
                   family = "binomial",
                   trControl = train_control)

```

```r
# Predictions
preds <- predict(glm_model, newdata = test)
confusionMatrix(preds, test$loan_status)
```

- Confusion matrix
```sql
   Reference (Actual values)
Prediction       Approved   Rejected
---------------------------------------
Approved            489         41
Rejected             42        281

```

- Measures of performance:

| Metric    | Score  | Interpretation                                                                                           |
| --------- | ------ | -------------------------------------------------------------------------------------------------------- |
| Accuracy  | 0.9027 | Out of 100 predictions made by the model, 90.27 are correct.                                             |
| Precision | 0.9227 | Out of all the loans claimed "Approved" by model, only 92.27% should be approved.(Includes type 2 error) |
| Recall    | 92.10  | Out of all the loans to be approved, only 92.1% of them are approved by the model.                       |
| F1 score  | 0.9219 |                                                                                                          |

#### Using RPart or Decision Tree Model:
Building a decision tree model.
```r
model <- rpart(loan_status ~., data = train)
model$variable.importance
rpart.plot(model)

prediction=predict(model,newdata = test,type="class")
prediction
confusionmatrix <- confusionMatrix(prediction,test$loan_status)
confusionmatrix
```

- Important Variables for due_diligence:

![[Var_Imp.png]]

- Rpart_Plot Chart:

![[rpart-plot.png]]

- Confusion Matrix

```sql
        Reference (Actual values)
Prediction       Approved   Rejected
---------------------------------------
Approved            527         19
Rejected              4        303

```

- Performance Metrics

| Metric    | Score | Interpretation                                                                                          |
| --------- | ----- | ------------------------------------------------------------------------------------------------------- |
| Accuracy  | 0.97  | Out of 100 predictions made by the model, 97 are correct.                                               |
| Precision | 0.965 | Out of all the loans claimed "Approved" by model, only 96.5% should be approved.(Includes type 2 error) |
| Recall    | 99.20 | Out of all the loans to be approved, only 99.2% of them are approved by the model.                      |
| F1 score  | 0.97  |                                                                                                         |

> [!Summary] Summary
> The top variables that could affect the loan status include: Credit score and loan time.
> The Decision Tree model outperforms the GLM model.
> 
> 


---

### References:

[^1]: 
![[BB7.png]]


[^2]: 
![[BB9.png]]

![[BB10.png]]

![[BB11.png]]

![[BB5.png]]

![[BB4.png]]

![[BB3.png]]

![[BB2.png]]

![[BB1.png]]

