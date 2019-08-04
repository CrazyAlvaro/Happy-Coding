import pandas as pd 

file_path = ""
data = pd.read_csv(file_path)

data.describe()
data.columns

# Clearning data
data = data.dropna(axis=0)

# Get Features
y = data.Price
features = ['Rooms', 'Bathroom', 'Landsize', 'lattitude', 'Longtitude']
X = data[features]

# Build model
from sklearn.tree import DecisionTreeRegressor

# ensure same results
model = DecisionTreeRegressor(random_state=1)

# Fit model
model.fit(X,y)

# Predict
print(model.predict(X.head()))

####################
# Validation
####################
# mean_absolute_error

from sklearn.model_selection import train_test_split
train_X, val_X, train_y, val_y = train_test_split(X, y, random_state=0)
# Define model

####################
# underfitting and overfitting 
####################

########################################
# Random Forests
########################################
from sklearn.ensemble import RandomForestRegressor

########################################
# Machine Lerning Competition
########################################

