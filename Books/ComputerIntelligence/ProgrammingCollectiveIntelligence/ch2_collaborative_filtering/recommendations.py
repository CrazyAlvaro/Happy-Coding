import datetime
from math import sqrt

# set of movies
critics={
    'Lisa Rose': {'Lady in the Water': 2.5, 'Snakes on a Plane': 3.5, 'Just My Luck': 3.0, 'Superman Returns': 3.5, 'You, Me and Dupree': 2.5, 'The Night Listener': 3.0}, 
    'Gene Seymour': {'Lady in the Water': 3.0, 'Snakes on a Plane': 3.5, 'Just My Luck': 1.5, 'Superman Returns': 5.0, 'The Night Listener': 3.0, 'You, Me and Dupree': 3.5}, 
    'Michael Phillips': {'Lady in the Water': 2.5, 'Snakes on a Plane': 3.0, 'Superman Returns': 3.5, 'The Night Listener': 4.0},
    'Claudia Puig': {'Snakes on a Plane': 3.5, 'Just My Luck': 3.0, 'The Night Listener': 4.5, 'Superman Returns': 4.0, 'You, Me and Dupree': 2.5},
    'Mick LaSalle': {'Lady in the Water': 3.0, 'Snakes on a Plane': 4.0, 'Just My Luck': 2.0, 'Superman Returns': 3.0, 'The Night Listener': 3.0, 'You, Me and Dupree': 2.0}, 
    'Jack Matthews': {'Lady in the Water': 3.0, 'Snakes on a Plane': 4.0, 'The Night Listener': 3.0, 'Superman Returns': 5.0, 'You, Me and Dupree': 3.5},
    'Toby': {'Snakes on a Plane':4.5,'You, Me and Dupree':1.0,'Superman Returns':4.0}
}

def sim_distance(prefs, person1, person2):
    """
    Calculate Distance between two person on shared items, using Euclidean Distance Score
    """
    si={} # shared_items
    # import pdb; pdb.set_trace()
    for item in prefs[person1]:
        if item in prefs[person2]:
            si[item] = 1
    
    # no shared_items
    if len(si) == 0: return 0

    sum_of_squares=sum([pow(prefs[person1][item]-prefs[person2][item],2) for item in si])

    return 1/(1+sqrt(sum_of_squares))

def sim_pearson(prefs, p1, p2):
    """
    Pearson 距离
    """
    si={}
    for item in prefs[p1]:
        if item in prefs[p2]: si[item] = 1
    
    n = len(si)

    if n == 0: return 0

    sum1=sum([prefs[p1][it] for it in si])
    sum2=sum([prefs[p2][it] for it in si])

    sum1Sq=sum([pow(prefs[p1][it],2) for it in si])
    sum2Sq=sum([pow(prefs[p2][it],2) for it in si])

    pSum=sum([prefs[p1][it]*prefs[p2][it] for it in si])

    num=pSum-(sum1*sum2/n)
    den=sqrt((sum1Sq-pow(sum1,2)/n)*(sum2Sq-pow(sum2,2)/n))
    if den==0: return 0

    return num/den

def topMatches(prefs, person, n=5, similarity=sim_pearson):
    """
    Find person's top matches other person, by similarity ranking
    """
    scores=[(similarity(prefs,person,other), other) for other in prefs if other!=person]

    scores.sort()
    scores.reverse()
    return scores[0:n]

def getRecommendations(prefs, person, similarity=sim_pearson):
    """
    Find recommendation movies from all persons' reviewed movies
    """
    sim_sum = {}
    movie_scores = {}

    # O(prefs) len(prefs) is very large in large dataset, think about millions of users
    for other in prefs:
        if person == other: continue
        similarity = sim_pearson(prefs, person, other)
        if similarity < 0: continue

        for movie in prefs[other]:
            if movie not in prefs[person] or prefs[person][movie] == 0:
                movie_scores.setdefault(movie, 0)
                movie_scores[movie] += similarity * prefs[other][movie]

                sim_sum.setdefault(movie, 0)
                sim_sum[movie] += similarity
        
    scores = [(movie_scores[item]/sim_sum[item], item) for item in movie_scores]
    scores.sort()
    scores.reverse()
    return scores

def transformPrefs(prefs):
    """
    Transform 
    {'Lisa Rose': {'Movie1': 3}}
    to
    {'Movie1': {'Lisa Rose': 3}}
    """
    movies = {}
    
    for person in prefs:
        for m in prefs[person]:
            movies.setdefault(m, {})
            movies[m][person] = prefs[person][m]
    
    return movies

movies = transformPrefs(critics)
# print(topMatches(movies, 'Superman Returns'))
print(getRecommendations(movies, 'Just My Luck'))

def calculateSimilarItems(prefs, n=10):
    """
    construct a similar item dict from prefs
    """
    itemPrefs = transformPrefs(prefs)

    result = {}
    counter = 0 # Progress Counter
    for item in itemPrefs:
        if counter % 100 == 0: print("%d / %d"%(counter, len(itemPrefs))+str(datetime.now()))

        # Get top n matched items
        similarItems = topMatches(itemPrefs, item, n)
        result[item]= similarItems
    
    return result

def getRecommendationItems(prefs, itemMatch, person):
    userRatings=prefs[person]
    itemScore = {}
    simSum = {}

    for (item, rating) in userRatings:

        # use itemMath, which are computed offline, increase the performance
        for (sim, item2) in itemMatch[item]:
            # already purchased
            if item2 in userRatings: continue
            
            itemScore.setdefault(item2, 0)
            itemScore[item2]+= sim*rating

            simSum.setdefault(item2, 0)
            simSum[item2]+= sim 
    
    rankings = [(score/simSum[item], item) for item,score in itemScore.items()]
    rankings.sort()
    rankings.reverse()
    return rankings