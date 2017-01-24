var React = require('react');

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Tickets = (props) => {
    return (
        <div>
            <h3>Tickets at the Chigwell Construction Stadium</h3>
            <h4>Online:</h4> <a href="http://www.daggerstickets.co.uk">www.daggerstickets.co.uk</a>
            <h4>Phone:</h4> <a href="tel://+442085921549">020 85921549</a> Ext. 21

            <h3>In Advance</h3>
            <p>Tickets in advance are available from the club shop, online or on the phone. Tickets purchased in advance on the phone or online can be collected on match days from the Match Day Collection Office before the match.</p>

            <h3>On the Day</h3>
            <p>On a match day tickets can be purchased on the turnstiles, (cash only,) for the Carling Stand, TBS Stand, Family Stand and terraces.</p>
            <p>Online Tickets for home games must be purchased in advance. Tickets on the day can only be purchased on the turnstiles.</p>



            <h3>2016/17 Season Tickets</h3>
            <p>With Adult half year season tickets starting from just £120.00 and Concession half year season tickets from £90.00, help support the Daggers in the second half of the 2016/2017 season.
                Season tickets are available to purchase in the shop or by filling out an application form.
                A full list of season ticket prices can be found below.</p>

            <table>
                <tbody>
                    <tr>
                        <td><h5>Terrace</h5></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Adult</td>
                        <td>&pound;120</td>
                    </tr>
                    <tr>
                        <td>Concession</td>
                        <td>&pound;90</td>
                    </tr>
                    <tr>
                        <td>Juniors (10-16 year olds)</td>
                        <td>&pound;50</td>
                    </tr>
                    <tr>
                        <td>Under-10</td>
                        <td>&pound;10</td>
                    </tr>

                    <tr>
                        <td><h5>Carling Stand</h5></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Adult</td>
                        <td>&pound;150</td>
                    </tr>
                    <tr>
                        <td>Concession</td>
                        <td>&pound;100</td>
                    </tr>
                    <tr>
                        <td>Juniors (10-16 year olds)</td>
                        <td>&pound;50</td>
                    </tr>
                    <tr>
                        <td>Under-10</td>
                        <td>&pound;10</td>
                    </tr>

                    <tr>
                        <td><h5>AGP Steel Family Stand</h5></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Adult</td>
                        <td>&pound;120</td>
                    </tr>
                    <tr>
                        <td>Juniors (10-16 year olds)</td>
                        <td>&pound;50</td>
                    </tr>
                    <tr>
                        <td>Under-10</td>
                        <td>FREE</td>
                    </tr>

                    <tr>
                        <td><h5>Traditional Builders Stand</h5></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Adult</td>
                        <td>&pound;150</td>
                    </tr>
                    <tr>
                        <td>Concession</td>
                        <td>&pound;100</td>
                    </tr>
                    <tr>
                        <td>Juniors (10-16 year olds)</td>
                        <td>&pound;80</td>
                    </tr>
                    <tr>
                        <td>Under-10</td>
                        <td>&pound;10</td>
                    </tr>
                </tbody>
            </table>

            <p>To purchase your season ticket please download an application form and send to the club, or alternatively, pop into the club shop (opening times) and fill in an application. 

                REMINDER | If you can’t make it during club shop opening hours you can post your form to the club. Alternately drop it off at the Daggers Bar if the club shop is closed and it will be processed the next day. 
                *Family stand half year season tickets will only be issued with minimum of one adult/concession and one junior/under-10 per application. 
                *Concessions are over 65s and students with a valid NUS card. 
                *Please note, Dagenham and Redbridge FC has the right to move TBS Season Ticket holders to the Carling Stand if there is an away following of more than 600 or the safety officer deems it necessary to have segregation. In this case, TBS Season Ticket holders will be allocated the best possible seat available in the Carling Stand.</p>


            <h3>Ticket Options (Home Fans)</h3>
            <ul>
                <li>Terrace Standing</li>
                <li>Carling Stand: Seated</li>
                <li>TBS Stand: Seated</li>
                <li>AGP Steel Family Stand: Seated - Ideal for families</li>
            </ul>


            <h3>Ticket Prices</h3>
            <h4>Home Tickets</h4>

            <table>
                <tbody>
                    <tr>
                        <td><h5>Terrace</h5></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Adult</td>
                        <td>&pound;18</td>
                    </tr>
                    <tr>
                        <td>Concession</td>
                        <td>&pound;13</td>
                    </tr>
                    <tr>
                        <td>Juniors (10-16 year olds)</td>
                        <td>&pound;10</td>
                    </tr>
                    <tr>
                        <td>Under-10</td>
                        <td>FREE*</td>
                    </tr>

                    <tr>
                        <td><h5>Carling Stand</h5></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Adult</td>
                        <td>&pound;21</td>
                    </tr>
                    <tr>
                        <td>Concession</td>
                        <td>&pound;15</td>
                    </tr>
                    <tr>
                        <td>Juniors (10-16 year olds)</td>
                        <td>&pound;12</td>
                    </tr>

                    <tr>
                        <td><h5>AGP Steel Family Stand</h5></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Adult</td>
                        <td>&pound;18</td>
                    </tr>
                    <tr>
                        <td>Concession</td>
                        <td>&pound;13</td>
                    </tr>
                    <tr>
                        <td>Juniors (10-16 year olds)</td>
                        <td>&pound;8</td>
                    </tr>
                    <tr>
                        <td>Under-10</td>
                        <td>&pound;2</td>
                    </tr>

                </tbody>
            </table>


            <h4>Home &amp; Away Tickets</h4>

            <table>
                <tbody>
                    <tr>
                        <td><h5>Traditional Builders Stand</h5></td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>Adult</td>
                        <td>&pound;21</td>
                    </tr>
                    <tr>
                        <td>Concession</td>
                        <td>&pound;15</td>
                    </tr>
                    <tr>
                        <td>Juniors (10-16 year olds)</td>
                        <td>&pound;12</td>
                    </tr>
                    <tr>
                        <td>Under-10</td>
                        <td>FREE**</td>
                    </tr>
                </tbody>
            </table>


            <h4>Terms</h4>
            <p>*Under-10’s must be purchased in advance of matchday with full paying adult equivalent for listed price. Match day under-10’s are charged junior prices. 1 Free under-10 per full paying adult.</p>

            <p>**Must be purchased in advance of matchday with adult equivalent. On the day, under-10’s are charged at 10. 1 Free under-10 per full paying adult.</p>

            <p>Concessions are classed as over 65's and students with a valid student ID unless stated otherwise.</p>

            <p>Please note, Dagenham and Redbridge FC has the right allocate the TBS stand to away fans if there is an away following of more than 600 or the safety officer deems it necessary to have segregation.</p>

            <p>For details on the clubs policy on disabled tickets please click here.</p>

        </div>
    );
}

module.exports = Tickets;
