const graphql = require('graphql'); //get graphql package
const _ = require('lodash'); //class object with many function to find 

const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList} = graphql; //grab graphql object from package

//dummy datas
var friends = [
    {id:'1' , name: 'Esmond', salary: '3500', courseid:'2'},
    {id:'2' , name: 'Henry', salary: '3800', courseid:'1'},
    {id:'3' , name: 'Emily', salary: '3900', courseid:'1'},
    {id:'4' , name: 'Weisheng', salary: '3400', courseid:'2'},
    {id:'5' , name: 'Eric', salary: '3500', courseid:'1'},
    {id:'6' , name: 'Zhenlong', salary: '3700', courseid:'2'},
    {id:'7' , name: 'WangAn', salary: '5000', courseid:'1'},
    {id:'8' , name: 'Brenda', salary: '4500', courseid:'1'},
    {id:'9' , name: 'Wenxin', salary: '4000', courseid:'3'}
];

var course = [
    {id:'1' , name: 'Info-com'},
    {id:'2' , name: 'Power'},
    {id:'3' , name: 'Robotic'}
]

const FriendType = new GraphQLObjectType({ //define friend object definition with graphql object type
    name:'Friend',

    //define the field that is in friend
    fields:()=>({ 
        id:{type : GraphQLID}, //allow int to be put in the string query without ""
        name:{type : GraphQLString}, 
        salary: {type : GraphQLInt}, //show that is int and allow integer operation
        course: {
            type : CourseType, //grab course definition
            resolve(parent,args){ //resolve look into the data
                //return a data that id in course match parent course id where parent is friend
                return _.find(course,{id:parent.courseid}); //find(json data we looking into, {variable in json : reference data}) // : is ==
            }
        }
    })
});

const CourseType = new GraphQLObjectType({
    name:'Course',
    fields:()=>({
        id:{type : GraphQLID},
        name:{type : GraphQLString},
        friend:{
            type: new GraphQLList(FriendType), //define a list of object friendtype
            resolve(parent,args){
                return _.filter(friends, {courseid:parent.id}); //return the list where courseid in friend match (parent.id or id in coursetype because parent is coursetype
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({ //define the structure of the query
    name:'RootQueryType',
    fields:{ 
        friend:{    //query structure for 1 friend with id  // {friends(id:1){}}
            type:FriendType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
               return _.find(friends, {id:args.id})
            }
        },

        course:{  //query structure  for course /{course{}}
            type:CourseType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(course,{id:args.id})
            }
        },
        friends:{ //query structure for all friends  // {friends{}}
            type: new GraphQLList(FriendType),
            resolve(parent,args){
                return friends;
            }
        }
      
    }
});



module.exports = new GraphQLSchema({
    query:RootQuery //define structure of query
});