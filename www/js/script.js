


    // owl carousel
    $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
            items: 1,
            loop: true,
            margin: 20,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                630: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            },
            navText: [
                '<i class="text-light fa fa-angle-left"></i>',
                '<i class="text-light fa fa-angle-right"></i>'
            ]
        });
    });

    //owl carousel
    // menu button toggle on dashboard
    function toggleBtn() {
        let sidenav = document.querySelector(".sidenav");
        let sidenavWidth = sidenav.offsetWidth;
        if (sidenavWidth > 150) {
            document.getElementById("Mysidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        } else {
            document.getElementById("Mysidenav").style.width = "200px";
            document.getElementById("main").style.marginLeft = "200px";
        }


    }
    // menu button toggle on dashboard

    function downloadImage(url, name) {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// Show loader and disable content
function showloader() {
  // Show the loader
  document.getElementById('loader').style.display = 'flex';

  // Disable content and apply blur effect
  document.querySelector('#remove').classList.add('disable', 'blur');
  document.querySelector('#remove').classList.add('disable', 'blur');
}

// Hide loader and enable content
function hideloader() {
  // Hide the loader
  document.getElementById('loader').style.display = 'none';

  // Enable content and remove blur effect
  document.querySelector('#remove').classList.remove('disable', 'blur');
}

    // Add event listener for page load
    window.addEventListener('load', function() {
  // Hide the loader
  document.getElementById('loader').style.display = 'none';
  // Enable content and remove blur effect
  document.querySelector('#remove').classList.remove('disable', 'blur');
});

    // update button
    $(document).ready(function () {
        $(document).on('click', 'a[data-role=update]', function () {
            //  alert($(this).data('id'));
            var eventid = $(this).data('id');
            // var image = $('#'+id).children('td[data-target=image]').text();
            var Name = $('#' + eventid).children('td[data-target=Name]').text();
            var Date = $('#' + eventid).children('td[data-target=Date]').text();
            var Venue = $('#' + eventid).children('td[data-target=Venue]').text();

            // $('#image').val(image);
            $('#EditEventModal').modal('toggle');
            $('#EventModal').modal('toggle');
            $('#eid').val(eventid);
            $('#eName').val(Name);
            $('#eDate').val(Date);
            $('#eVenue').val(Venue);

        })
    });

    // update button

    // delete button
    $(document).ready(function () {
        $(document).on('click', 'a[data-role=delete]', function () {
            //  alert($(this).data('id'));
            var eventid = $(this).data('id');
            // var image = $('#'+id).children('td[data-target=image]').text();
            var Name = $('#' + eventid).children('td[data-target=Name]').text();
            var Date = $('#' + eventid).children('td[data-target=Date]').text();
            var Venue = $('#' + eventid).children('td[data-target=Venue]').text();

            // $('#image').val(image);
            $('#DeleteEventModal').modal('toggle');
            $('#EventModal').modal('toggle');
            $('#Delid').val(eventid);
            $('#DelName').val(Name);


        })
    });
    // delete button


    // share button
    $(document).ready(function () {
        $(document).on('click', '.share1', function () {
            // alert($(this).data('id'));
            var eventid = $(this).data('id');
            var name = $(this).data('name');
            var seatId = $(this).data('cmd');
            // var venue = $('#Venue').text();

            // $('#EditEventModal').modal('toggle');
            // $('#eName').val(name);
            $('#seatId').val(seatId);
            $('#TicketEventName').val(name);
            $('#TicketId').val(eventid);

        })

    })
    // share button


    // scan event
    $(document).ready(function () {
        $(document).on('click', '.ScanValueE', function () {
            var ScanValueE = document.getElementById('ScanValueE').value;
            if (ScanValueE != "") {
                // ScanValueE = "";
                //alert(ScanValueE);
                $.ajax({
                    type: "POST",
                    url: "scanTicketAction.php",
                    data: {
                        ScanValueE: ScanValueE
                    },
                    cache: false,
                    success: function (data) {
                        //event id
                        // /document.getElementById('result').value = data;
                        ScanValueE = "";
                        var id1 = JSON.stringify(data);
                        var id1 = JSON.parse(id1);
                        // alert(id1.name);
                        // alert('here '+id1);
                        // var scope1 = JSON.parse(data).scope;
                        // var name1 = JSON.parse(data).name;
                        // var status1 = JSON.parse(data).status;
                        // var date1 = JSON.parse(data).date;
                        // var time1 = JSON.parse(data).time;
                        // var eName1 = JSON.parse(data).eName;
                        // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

                        // checkinh if the guest exists in the database
                        if (id1 == null) {
                            var html = '<tr>';
                            html += '<th scope="row">No Guest Found</th></tr>';

                            document.getElementById('qrGuestName').innerHTML = "<span>Qr Message Is</span>";
                            document.getElementById('result').value = qrCodeMessage;
                        } else {
                            document.getElementById('result').value = name1;
                            document.getElementById('qrGuestName').innerHTML = "<span>Guest Name:</span>";
                        }
                        // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
                        if (status1 == "PAID" && time1 != null) {//if paid and already entered
                            document.getElementById('status1').innerHTML = "<p class='animate__animated animate__zoomInDown fs-4 text-dark fw-bold bg-danger p-3 text-center'><i>Already Been Used And Verified By</i> " + name1 + " <i>At</i> <br>" + time1 + " !! <br> <small class='p-1 m-1 text-danger bg-dark'>PLEASE SHOW YOUR PASS TO PROCEED</small></p>";
                        } else if (status1 == "PAID" && time1 == null) {//if paid and not entered
                            document.getElementById('status1').innerHTML = "<p class='animate__animated animate__zoomInDown fs-4 fw-bold text-dark bg-success p-3 text-center'><i class='fa-solid fa-check-double'></i> <br>Already Paid <br> Successfully Verified</p>";
                            $.ajax({
                                type: "POST",
                                url: "insertScanTime.php",
                                data: {
                                    qrCodeMessage: qrCodeMessage
                                },
                                cache: false,
                                success: function (qrCode) {
                                    // document.getElementById('status1').innerHTML = "<p class='fs-5 text-dark fw-bold bg-success p-3 text-center'>Successfully Verified !!</p>";
                                    //alert('VERIFIED');

                                },
                                error: function (xhr, status, error) {
                                    console.error(xhr);
                                }
                            });
                        } else if (status1 == "NOT PAID" && time1 == null) {//if not paid and not entered
                            document.getElementById('status1').innerHTML = "<p class='animate__animated animate__zoomInDown fs-5 text-dark fw-bold bg-danger p-3 text-center'>NOT PAID !! <br> <i>Pay Now to Verify Ticket</i> <button class='verifyBtn animate__animated animate__shakeX animate__infinite animate__delay-2s animate__slow btn p-1 m-1 fw-bold fs-4 text-danger bg-dark'>Verify Payment</button></p>";
                            // on click on the verify buutton above
                            $(document).ready(function () {
                                $(document).on('click', '.verifyBtn', function () {
                                    // alert('verified button clicked');                                            
                                    $.ajax({
                                        url: "verifyScannedTicket.php",
                                        type: "POST",
                                        data: { qrCodeMessage: qrCodeMessage },
                                        success: function (result) {
                                            document.getElementById('status1').innerHTML = "<p class='animate__animated animate__zoomInDown fs-5 text-dark fw-bold bg-success p-3 text-center'>Successfully Verified !!</p>";
                                            //alert('successfully Verified'); 

                                        }
                                    });

                                })

                            })
                        } else {
                            document.getElementById('status1').innerHTML = "<p class='animate__animated animate__zoomInDown fs-5 text-dark fw-bold bg-danger p-3 text-center'><i class='fa-solid fa-xmark'></i><br>ERROR<br><i>GUEST NOT INVITED</i> !!</p>";
                        }
                        // alert("the name is " + name1 + " he has " + status1 + " Time entered " + time1);
                    },
                    error: function (xhr, status, error) {
                        console.error(xhr);
                    }
                });
            }

        })

    })
    // scan event
    // This script adds the "active-tab" class to the button when aria-selected="true"
// $(document).ready(function() {
//   // Add click event handler to buttons
//   $('button[role="tab"]').on('click', function() {
//     // Remove "active-tab" class from all buttons
//     $('button[role="tab"]').removeClass('active-tab');
    
//     // Add "active-tab" class to the clicked button
//     $(this).addClass('active-tab');
//   });
// });



    // generate ticket
    $(document).ready(function () {
        $(document).on('click', '.GENERATEt', function () {
            var ScanValue2 = 'Success';
            var F_Name = document.getElementById('GuestName').value;
            var number1 = document.getElementById('seatId').value;
            var number = document.getElementById('TicketId').value;
            if (F_Name != "") {
                document.getElementById('guestName1').innerHTML = "<i class='animate__animated animate__zoomInDown fs-6 text-danger fw-bold text-center'></i>";
                showloader();
                // ScanValueE = "";
                //alert(ScanValueE);
                setTimeout(function() {
                    // Call hideSpinner() after a delay (replace with your actual loading completion logic)
                    hideloader();
                    $('#GuestName').val('');
                    }, 5000);
                    
            } else {
                // alert('Please Enter Guest Name !');
                // document.querySelector('#guestName1').style.display = "inline-block";
                document.getElementById('guestName1').innerHTML = "<i class='animate__animated animate__zoomInDown fs-6 text-danger fw-bold text-center'>-Please enter guest name !</i>";

            }

        })

    })
    // generate ticket

    // login button
    $(document).ready(function () {
        $(document).on('click', '.Loginbtn', function () {
            var Email = document.getElementById('loginEmail').value;
            var Pass = document.getElementById('loginPass').value;

            if (Email != "" && Pass != "") {
                showloader();
                // ScanValueE = "";
                //alert(ScanValueE);
                setTimeout(function() {
                    // Call hideSpinner() after a delay (replace with your actual loading completion logic)
                    // hideloader();
                    window.location.href = "dashboard.html";
                    }, 5000);
            } else {
                // alert("Empty");
                //     // alert('Please Enter Guest Name !');
                //     // document.querySelector('#guestName1').style.display = "inline-block";
                document.getElementById('LoginFeedback').innerHTML = "<i class='animate__animated animate__zoomInDown fs-6 text-danger fw-bold text-center'>Enter Email and Password</i>";

            }

        })

    })
    // login button

    // signup button
    $(document).ready(function () {
        $(document).on('click', '.Signupbtn', function (e) {
            e.preventDefault();
            var Email = document.getElementById('loginEmail1').value;
            var Pass = document.getElementById('loginPass1').value;

            if (Email != "" && Pass != "") {
                showloader();
                // ScanValueE = "";
                //alert(ScanValueE);
                setTimeout(function() {
                    // Call hideSpinner() after a delay (replace with your actual loading completion logic)
                    // hideloader();
                    window.location.href = "dashboard.html";
                    }, 5000);
            } else {
                // alert("Empty");
                //     // alert('Please Enter Guest Name !');
                //     // document.querySelector('#guestName1').style.display = "inline-block";
                document.getElementById('SigninFeedback').innerHTML = "<i class='animate__animated animate__zoomInDown fs-6 text-danger fw-bold text-center'>Fill in Details</i>";

            }

        })

    })
    // signup button

