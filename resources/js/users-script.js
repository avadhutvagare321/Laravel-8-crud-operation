$(document).ready(function () {

        $.validator.addMethod("name", function(value, element) {
            return this.optional(element) || /^[^\s][a-z\sA-Z\s0-9\s-()][^\s$]/.test(value);
        }, "Please enter a valid name.");

        $.validator.addMethod("email", function(value, element) {
            return this.optional(element) || /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
        }, "Please enter a valid email address.");

        $.validator.addMethod("password", function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9\.\- ]{6,}$/.test(value);
        }, "Please enter a valid password.");

        $("#createUserForm").submit(function(e) {
            e.preventDefault();
        }).validate({ // initialize the plugin
            rules: {
                name: {
                    required: true,
                    name: true
                },
                email: {
                    required: true,
                    email: true,
                    remote: {
                        url: base_url+'/user/checkemail',
                        type: "post",
                        data: {
                                email:function(){ return $('#email').val() },
                                _token:$("input[name='_token']").val()
                        },
                        dataFilter: function (data) {
                            var json = JSON.parse(data);
                            if (json.msg == "true") {
                                return false;
                            } else {
                                return 'true';
                            }
                        }
                    }
                },
                password: {
                  required: true,
                  // pwd: true
                }
            },
            messages: {
                  name: {
                      required: "Name is required."
                  },
                  email: {
                      required: "E-Mail address is required.",
                      email: "Please enter a valid email address.",
                      remote: "Email address already in use."
                  },
                  password: {
                    required: "Password is required."
                  }
            },
            submitHandler: function (form) {
                // console.log('test');
                $('#createUserBtn').attr('disabled', 'disabled');
                form.submit();
            }

        });

        $("#editUserForm").submit(function(e) {
            e.preventDefault();
            // alert(``);
            $('#password').rules("remove","required");
        }).validate({ // initialize the plugin
            rules: {
                name: {
                    required: true,
                    name: true
                },
                email: {
                    required: true,
                    email: true,
                    remote: {
                        url: base_url+"/user/checkemail",
                        type: "post",
                        data: {
                                uid:$("input[name='uid']").val(),
                                email:function(){ return $('#email').val() },
                                _token:$("input[name='_token']").val()
                        },
                        dataFilter: function (data) {
                            var json = JSON.parse(data);
                            if (json.msg == "true") {
                                return false;
                            } else {
                                return 'true';
                            }
                        }
                    }
                },
                password: {
                  required: true,
                  // pwd: true
                }
            },
            messages: {
                  name: {
                      required: "Name is required."
                  },
                  email: {
                      required: "E-Mail address is required.",
                      email: "Please enter a valid email address.",
                      remote: "Email address already in use."
                  },
                  password: {
                    required: "Password is required."
                  }
            },
            submitHandler: function (form) {
                // console.log('test');
                $('#editUserBtn').attr('disabled', 'disabled');
                form.submit();
            }

        });

        $('.delete-user').click(function(e){
            e.preventDefault() // Don't post the form, unless confirmed
            swal({
              title: "Are you sure?",
              text: "Are you sure that you want to delete this user?",
              buttons: true,
              icon: "warning",
              dangerMode: true,
            })
            .then(willDelete => {
              if (willDelete) {
                $(e.target).closest('form').submit() // Post the surrounding form
              }
            });
        });

});