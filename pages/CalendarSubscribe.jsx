import React from 'react';

export default class CalendarSubscribe extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="columns small-12">

                    <h3>Fixtures Calendar</h3>

                    <table className="hover stack">
                        <tbody>
                            <tr>
                                <td className="text-center">
                                    <a href="https://calendar.google.com/calendar/r?cid=https%3A%2f%2fcalendar.google.com%2fcalendar%2fical%2fdaggersfc110%40gmail.com%2fpublic%2fbasic.ics" className="button expanded">
                                        <i className="fi-calendar"></i> Google Calendar
                                    </a>
                                </td>
                                <td>
                                    <ul>
                                        <li>Click the button, Google Calendar will open in a new window.</li>
                                        <li>You will see a message to confirm you want to add the Daggers calendar to yours. Accept this and you are done!</li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center">
                                    <a href="https://outlook.live.com/owa/?path=/calendar/action/subscribe&url=https%3A%2f%2fcalendar.google.com%2fcalendar%2fical%2fdaggersfc110%40gmail.com%2fpublic%2fbasic.ics&name=Daggers+calendar&mkt=en-001" className="button expanded">
                                        <i className="fi-social-windows"></i> Outlook.com
                                    </a>
                                </td>
                                <td>
                                    <ul>
                                        <li>Click the button, Outlook.com will open in a new window.</li>
                                        <li>You will see a message to confirm you want to add the Daggers calendar to yours. Accept this and you are done!</li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center">
                                    <a href="webcal://calendar.google.com/calendar/ical/daggersfc110%40gmail.com/public/basic.ics" className="button expanded">
                                        <i className="fi-social-apple"></i> Apple Calendar
                                    </a>
                                </td>
                                <td>
                                    <ul>
                                        <li>Click the button. Depending on your browser you should see a dialog box asking you to accept the subscription in your default e-mail program.</li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center">
                                    <a href="https://calendar.google.com/calendar/ical/daggersfc110%40gmail.com/public/basic.ics" className="button expanded">
                                        <i className="fi-social-windows"></i> Outlook
                                    </a>
                                </td>
                                <td>
                                    <ul>
                                        <li>Click the button. Depending on your browser you should see a dialog box asking you to accept the subscription in your default e-mail program.</li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center">
                                    <strong>Other</strong>
                                </td>
                                <td>
                                    <ul>
                                        <li>Check the documentation for your calendar program or service on how to subscribe to or import calendar events.</li>
                                        <li>If you need an ICS file, <a href="https://calendar.google.com/calendar/ical/daggersfc110%40gmail.com/public/basic.ics">click here to download</a></li>
                                        <li className="word-break">If you need a web link you can use "https://calendar.google.com/calendar/ical/daggersfc110%40gmail.com/public/basic.ics"</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>
        );
    }
};
