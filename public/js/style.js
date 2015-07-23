// Generated by CoffeeScript 1.9.3
(function() {
  $(function() {
    var card_box, friend_box, h, header_h, load_more, load_more_friend, loading, loading_friend, menu_h, over_head, parallax, parallax_height, parallax_img, w, win_blank, wrf;
    $('.parallax').parallax();
    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();
    $('.modal-trigger').leanModal();
    $(".dropdown-button").dropdown();
    $('.materialboxed').materialbox();
    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 15
    });
    $('ul.tabs').tabs();
    w = $(window);
    h = w.height();
    $("#before_login_page").css({
      height: h
    });
    wrf = $(".show_write_rep");
    wrf.on("click", function() {
      var form_id, this_id;
      this_id = $(this).attr("id");
      form_id = this_id + "_form";
      return $("#" + form_id).slideToggle();
    });
    w = $(window);
    parallax = $(".parallax-container");
    parallax_height = parallax.height() * 0.666;
    parallax_img = $(".parallax img");
    w.scroll(function() {
      var sc;
      sc = $(this).scrollTop();
      if (parallax_height < sc) {
        return parallax_img.addClass("blur");
      } else {
        return parallax_img.removeClass("blur");
      }
    });
    $("#sub").on("click", function() {
      var d, data;
      d = $("#dammy").val() || "stone";
      data = {};
      data.send = d;
      return $.post("/users/ajax", data, function(data) {});
    });
    loading_friend = $("#loading_friend");
    load_more_friend = $("#load_more_friend");
    loading_friend.hide();
    friend_box = $("#friend_place");
    load_more_friend.on("click", function() {
      var all_friends, p, page_id;
      all_friends = $("#all_friends_id").val().split("_");
      $(this).hide();
      loading_friend.show();
      page_id = $(".page_id");
      p = parseInt(page_id.val());
      page_id.val("" + (p + 1));
      return $.post("/friends/more", {
        page_id: p
      }, function(data) {
        var current_user_id, friend_btn;
        current_user_id = $("#current_user_id").val();
        friend_btn = function(all_friends, friend) {
          if (all_friends.indexOf(friend.id) >= 0) {
            return "<button id='be_friend_form_103_3 friend_follow_submit' data-friend-id='be_friend_form_103_3' action='/friends/unfollow' class='btn-flat pink white-text waves-effect waves-light be_friend_form'> <i class='fa fa-heart'/> </button>";
          } else {
            return "<button id='be_friend_form_98_3 friend_follow_submit' data-friend-id='be_friend_form_98_3' action='/friends/follow' class='btn-flat blue white-text waves-effect waves-light be_friend_form'> <i class='fa fa-heart-o'/> </button>";
          }
        };
        return setTimeout(function() {
          var i, len, post_card, user;
          for (i = 0, len = data.length; i < len; i++) {
            user = data[i];
            post_card = "<li class='collection-item avatar'><img src='" + (user.image != null ? user.image : "/images/colorfull2.jpg") + "' class='circle'> <span class='title'><a href='/users/" + user.id + "'>" + user.name + "</a></span> <div class='secondary-content'> " + (friend_btn(all_friends, user)) + " </div> </li>";
            friend_box.append(post_card);
          }
          loading_friend.hide();
          return load_more_friend.fadeIn();
        }, 666);
      });
    });
    loading = $("#loading");
    load_more = $("#load_more");
    loading.hide();
    card_box = $("#card_box");
    load_more.on("click", function() {
      var create_delete_form, current_user_id, p, page_id;
      $(this).hide();
      loading.show();
      page_id = $(".page_id");
      p = parseInt(page_id.val());
      page_id.val("" + (p + 1));
      create_delete_form = function(post, current_user_id) {
        if (post.user_id === parseInt(current_user_id)) {
          return "<a href='/posts/" + post.id + "/edit'>編集</a><i id='delete_post_" + post.id + "_" + post.user_id + "' class='mdi-action-delete red-text tiny delete_post_form right'></i>";
        } else {
          return "";
        }
      };
      current_user_id = $("#current_user_id").val();
      return $.post("/posts/more", {
        page_id: p
      }, function(data) {
        return setTimeout(function() {
          var i, len, post, post_card;
          for (i = 0, len = data.length; i < len; i++) {
            post = data[i];
            post_card = "<article id='posted_card_" + post.id + "' class='col s12 m6'> <div class='card'> <div class='card-content'> <div class='row'> <div class='col s2 m3 l2'> <img src='" + (post.user_image != null ? post.user_image : "/images/amethyst_flat.png") + "' class='circle responsive-img'> </div> <div class='col s10 m9 l10'><span class='card-title cyan-text'>" + post.user_name + "</span></div> </div> <p>" + (post.body.replace(/\n/g, '<br/>')) + "</p> <span class='font_size_10 right'>" + post.created_at + "</span> </div> <div class='card-action'> <a href='/posts/" + post.id + "' class='teal-text'>コメント</a> " + (create_delete_form(post, current_user_id)) + " </div> </div> </article>";
            card_box.append(post_card);
          }
          loading.hide();
          return load_more.fadeIn();
        }, 666);
      });
    });
    $(document).on("click", ".be_friend_form", function() {
      var data, form_id, fs, this_form, url;
      form_id = $(this).attr("data-friend-id");
      this_form = $(this);
      this_form.hide();
      url = $(this).attr("action");
      fs = form_id.split("_");
      data = {};
      data.user_id = fs[4];
      data.friend_id = fs[3];
      return $.post(url, data, function(data) {
        var BASE, path;
        Materialize.toast(data.flash, 3330);
        if (data.state) {
          BASE = "/friends";
          path = url.split("/")[2];
          switch (path) {
            case "follow":
              return this_form.attr("action", BASE + "/unfollow").empty().append("<i class='fa fa-heart'/>").removeClass("blue").addClass("pink").show();
            case "unfollow":
              return this_form.attr("action", BASE + "/follow").empty().append("<i class='fa fa-heart-o'/>").removeClass("pink").addClass("blue").show();
          }
        }
      });
    });
    $("#edit_user_profile_form").submit(function(e) {
      var data, url;
      e.preventDefault();
      data = {};
      data.name = $("#user_name").val();
      data.email = $("#user_email").val();
      data.description = $("#user_profile").val();
      url = $(this).attr("action");
      return $.post(url, data, function(data) {
        if (data.state) {
          Materialize.toast(data.flash, 3330);
          $("#usr_name").text(data.name);
          $("#usr_email").text(data.email);
          $("#usr_prof").text(data.description);
          $("#user_name").text(data.name);
          $("#user_email").text(data.email);
          $("#user_profile").text(data.description);
          return $("#edit_user_profile").closeModal();
        } else {
          return Materialize.toast(data.flash, 3330);
        }
      });
    });
    $(".commit_cotery").submit(function(e) {
      var data, id, t, url;
      e.preventDefault();
      url = $(this).attr("action");
      id = $(".commit_btn").attr("id");
      data = {
        user_id: id.split("_")[3],
        cotery_id: id.split("_")[2]
      };
      t = $(this);
      return $.post(url, data, function(data) {
        if (data.state) {
          $(t).append("<p>サークルに参加希望をだしました</p>");
          $("#" + id).hide();
          return Materialize.toast(data.flash, 3330);
        } else {
          return Materialize.toast(data.flash, 3330);
        }
      });
    });
    $(".change_permit").submit(function(e) {
      var data, id, ids, url;
      e.preventDefault();
      url = $(this).attr("action");
      id = $(this).attr("id");
      ids = id.split("_");
      data = {
        cotery_id: ids[1],
        user_id: ids[2],
        permit_user_id: ids[3]
      };
      return $.post(url, data, function(data) {
        if (data.state) {
          Materialize.toast(data.flash, 3330);
          return $("#waiting_user_" + data.user_id).fadeOut();
        } else {
          return Materialize.toast(data.flash, 3330);
        }
      });
    });
    $(document).on("click", ".delete_post_form", function() {
      var data, id, url;
      console.log("cliecled");
      id = $(this).attr("id");
      data = {
        post: id.split("_")[2],
        user: id.split("_")[3]
      };
      url = "/posts/" + data.post + "/delete";
      $("#posted_card_" + data.post).fadeOut();
      return $.post(url, data, function(data) {
        if (data.state) {
          return Materialize.toast(data.flash, 3330);
        } else {
          return Materialize.toast(data.flash, 3330);
        }
      });
    });
    header_h = $("header").height();
    menu_h = $("#make_margin_top").height();
    over_head = menu_h + header_h;
    win_blank = h - over_head - 18;
    return $("#talk_place").css({
      height: win_blank,
      overflow: "scroll",
      " -webkit-overflow-scrolling": "touch"
    }).animate({
      scrollTop: $("#sc_end").offset().top
    }, 10);
  });

}).call(this);
