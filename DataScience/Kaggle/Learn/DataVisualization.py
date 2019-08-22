########################################
# Univariate plotting with pandas 
########################################

import pandas as pd

pd.DataFrame.plot.bar()
pd.DataFrame.plot.area()
pd.DataFrame.plot.line()
pd.DataFrame.plot.hist()

########################################
# Bivariate plotting with pandas
########################################

# two-dimensional space
pd.DataFrame.plot.scatter(x='', y='')

# Hexplot color darkness
pd.DataFrame.plot.hexbin(x='',y='',gridsize=15)

# Stacked plot bar
pd.DataFrame.plot.bar(stacked=True)

########################################
# Plotting with seaborn
########################################

import seaborn as sns
# sns.countplot()
# sns.kdeplot()
# sns.distplot