import sys
import json

statementsPercentage = 0
branchesPercentage = 0
functionsPercentage = 0
linesPercentage = 0

path = (sys.argv)[1]
statementsThreshold = (sys.argv)[2]
branchesThreshold = (sys.argv)[3]
functionsThreshold = (sys.argv)[4]
linesThreshold = (sys.argv)[5]

try: 
    file = open(path)
    data = json.load(file)
    statementsPercentage = data['total']['statements']['pct']
    branchesPercentage = data['total']['branches']['pct']
    functionsPercentage = data['total']['functions']['pct']
    linesPercentage = data['total']['lines']['pct']
except:
    raise Exception("Couldn't parse JSON file")

if (float(statementsPercentage) < float(statementsThreshold)):
    raise Exception("Coverage criteria for statements wasn't met")

if (float(branchesPercentage) < float(branchesThreshold)):
    raise Exception("Coverage criteria for branches wasn't met")

if (float(functionsPercentage) < float(functionsThreshold)):
    raise Exception("Coverage criteria for functions wasn't met")

if (float(linesPercentage) < float(linesThreshold)):
    raise Exception("Coverage criteria for lines wasn't met")
 
file.close()