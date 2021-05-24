import React from "react";

const SiteDescription = props =>
    <div>
        <div className='col-8'>
            <h1 className='display-3'>Campaign Tracker</h1>
            <h3>About this Site</h3>
            <p>
                This site is designed to track the sessions and journey for a tabletop RPG group.  You can create a temporary account to experience the full functionality of the site, or you can view the sample data as a guest without creating an account.
                At this time, new accounts are for demonstration purposes and will be deleted along with all of their data daily.
            </p>
            <h3>Sessions</h3>
            <p>
                In the sessions tab you can take notes and keep track of any items or gold found during a session of play.
                Saved sessions are stored in the database and can be viewed, edited, or deleted using this site.
            </p>
            <h3>Journey</h3>
            <p>
                In the journey tab you can keep track of where the party has been by adding locations and paths to the map.
                You can then link the sessions you created to any location or path. The journey information is also stored in the database and can be edited at any time. 
                At this time, custom images cannot be uploaded and only the default image can be used for the map.
            </p>
            <br />
            <p>The source code can be found <a href='https://github.com/KyleJSchaffer/campaign-tracker'>here</a></p>
        </div>
    </div >

export default SiteDescription