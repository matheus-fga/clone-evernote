import './App.scss';
import { Notification, Section } from 'rbx';

const App = () => (
  <div className='App'>
    <Section>
      <Notification color='success'>
        JavaScript Notes!
      </Notification>
    </Section>
  </div>
)

export default App;
