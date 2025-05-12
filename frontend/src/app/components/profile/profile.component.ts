export class ProfileComponent {
  user: any; // This will hold the user data

  constructor(private userService: UserService) {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile().subscribe(data => {
      this.user = data;
    });
  }

  updateProfile() {
    this.userService.updateUserProfile(this.user).subscribe(response => {
      // Handle successful profile update
    }, error => {
      // Handle error
    });
  }
}