/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    $(document).on('click', '.Loginbtn', function () {
        // alert("here");
        // let enLoader = document.querySelector(".loader"); //enable loader
        // let words = document.querySelector(".index");
        // var ScanValue2 = 'Success';
        var Email = document.getElementById('loginEmail').value;
        var Pass = document.getElementById('loginPass').value;
        // alert(Email + Pass);

        if (loginEmail != "" && loginPass != "") {

            //     document.getElementById('guestName1').innerHTML = "<i class='animate__animated animate__zoomInDown fs-6 text-danger fw-bold text-center'></i>";
            //     words.style.filter = "blur(3px)";
            //     enLoader.style.display = "block";
            $.ajax({
                type: "POST",
                url: "http://localhost/php/ticket/icecream/loginaction.php",
                dataType: "json",
                data: {
                    Email: Email,
                    Pass: Pass
                },
                cache: false,
                success: function (data) {
                    var id1 = JSON.parse(data).name;
                    if (id1 == "null") {
                        // alert("else");
                        document.getElementById('LoginFeedback').innerHTML = "<i class='animate__animated animate__zoomInDown fs-3 text-danger fw-bold text-center'>Invalid Credentials</i>";
                    } else {
                        // alert(id1);
                        // window.location.href = "dashboard.php";
                        alert(id1);
                    }

                },
                error: function (xhr, status, error) {
                    console.error(xhr);
                }
            });
        } else {
            // alert("Empty");
            //     // alert('Please Enter Guest Name !');
            //     // document.querySelector('#guestName1').style.display = "inline-block";
            document.getElementById('LoginFeedback').innerHTML = "<i class='animate__animated animate__zoomInDown fs-6 text-danger fw-bold text-center'>Enter Email and Password</i>";

        }

    })

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
