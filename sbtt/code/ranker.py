import operator


MATCH_INCR = 16    
f = open('sbtt.csv')
f2 = open('ranking.csv')
rankings = {}
newRankings = {}


def setRanking(winner, loser, deltaRanking):
	newRankings[winner] = newRankings[winner] + MATCH_INCR + deltaRanking
	newRankings[loser] = newRankings[loser] + MATCH_INCR - deltaRanking

for row in f2:
	items = row.split(',')
	rankings[items[0]] = int(items[1])

newRankings = rankings
for row in f:
	items = row.split(',')
	p1 = items[0]
	p2 = items[1]
	
	s1 = items[2]
	s2 = items[3]
	r1 = rankings[p1]
	r2 = rankings[p2]
	deltaR = abs(r1 - r2) * 0.04
	for i in s1:
		setRanking(p1, p2, deltaR)
		
	for i in s2:
		setRanking(p2, p1, deltaR)


filename = 'newRankings.csv'
FILE = open(filename,"w")

# Sort dict by new ranking order
sorted_x = sorted(newRankings.iteritems(), key=operator.itemgetter(1))
print sorted_x
# Write all the lines at once:

for pairs in sorted_x:
	print pairs[0]
	print pairs[1]
	FILE.write(str(pairs[0]) + "," +  str(pairs[1]) + '\n')
FILE.close()
f.close()
	
    
    
   