import React from 'react';
import './App.css';
import faker from 'faker';
import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';

function App() {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <div>
          <h4>Warning!</h4>
          Are you sure you want to do this?
        </div>
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail author="Sam" 
        timeAge="Today at 6:00PM" 
        content="Nice blog post."
        avatar={faker.image.avatar()}
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail author="Alex" 
        timeAge="Today at 5:00PM" 
        content="I like this subject."
        avatar={faker.image.avatar()} 
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail author="Jane" 
        timeAge="Yesterday at 4:00PM" 
        content="I like the writing"
        avatar={faker.image.avatar()} 
        />
      </ApprovalCard>
    </div>
  );
}

export default App;
