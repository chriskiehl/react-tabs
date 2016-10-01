import Paper from 'material-ui/Paper';
import TextField from "material-ui/TextField";
import Toggle from 'material-ui/Toggle';

export const SecurityForm = () => (
  <div style={{padding: '20px 20px'}}>
    <TextField hintText="Password" fullWidth={true} />
    <TextField hintText="Repeat Password" fullWidth={true} />
  </div>
);

export const AccountForm = () => (
  <div style={{padding: '20px 20px'}}>
    <TextField hintText="Username" floatingLabelText={"Username"} fullWidth={true} />
    <TextField hintText="Full Name" fullWidth={true} />
    <TextField hintText="email" fullWidth={true} />
    <TextField hintText="Phone" fullWidth={true} />
  </div>
);

export const SettingsForm = () => (
  <div style={{padding: '20px 20px'}}>
    <Toggle label="Location" defaultToggled/>
    <Toggle label="Ads" />
    <Toggle label="Tracking" />
    <Toggle label="Other" defaultToggled />
    <Toggle label="Stuff" defaultToggled />
  </div>
);

export class TestArea extends React.Component {
  render() {
    return (
      <div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <Paper style={{width: '300px', height: '500px'}} >
          <div style={{backgroundColor: '#757575', height: '60px', color: 'white'}}>
            <h3 style={{fontWeight: 400, padding: '24px 12px', margin: 0}}>Tab Demo</h3>
          </div>

          <SlideTabs >
            <SlideTab label="Account">
              <AccountForm />
            </SlideTab>
            <SlideTab label="Security">
              <SecurityForm />
            </SlideTab>
            <SlideTab label="Settings">
              <SettingsForm />
            </SlideTab>
          </SlideTabs>

        </Paper>
      </div>
    )
  }
}
