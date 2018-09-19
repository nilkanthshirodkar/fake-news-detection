import pickle
from flask import Flask, jsonify    
from flask_cors import CORS, cross_origin
from textblob.classifiers import NaiveBayesClassifier
from textblob import TextBlob

app = Flask(__name__)
CORS(app)



@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route("/checknews/<var>", methods=["GET"])
def detecting_fake_news(var):

    train = [
    ('Says the Annies List political group supports third-trimester abortions on demand.', 'false'),
    ('Donald Trump is against marriage equality. He wants to go back.', 'true'),
    ('Says nearly half of Oregons children are poor.', 'true'),
    ('State revenue projections have missed the mark month after month.', 'true'),
    ("In the month of January, Canada created more new jobs than we did.", 'true'),
    ('If people work and make more money, they lose more in benefits than they would earn in salary.', 'false'),
    ('Originally, Democrats promised that if you liked your health care plan, you could keep it. One year later we know that you need a waiver to keep your plan.', 'false'),
    ("We spend more money on antacids than we do on politics.", 'false'),
    ('Barack Obama and Joe Biden oppose new drilling at home and oppose nuclear power.', 'false'),
    ('President Obama once said he wants everybody in America to go to college.', 'false')
    ]
    test = [
    ('Because of the steps we took, there are about 2 million Americans working right now who would otherwise be unemployed.', 'true'),
    ('Scientists project that the Arctic will be ice-free in the summer of 2018', 'false'),
    ("You cannot build a little guy up by tearing a big guy down -- Abraham Lincoln said it.", 'false'),
    ("One man opposed a flawed strategy in Iraq. One man had the courage to call for change. One man didn't play politics with the truth.", 'true'),
    ('When I was governor, not only did test scores improve we also narrowed the achievement gap.', 'true'),
    ("Ukraine was a nuclear-armed state. They gave away their nuclear arms with the understanding that we would protect them.", 'false')
    ]   

    cl = NaiveBayesClassifier(train)
    result = cl.classify(var) 

    return result



if __name__ == "__main__":
    app.run(debug=True)